import React from 'react';
import $ from "jquery";
import Config from "../../Config";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CF from "../../CustomFunctions";
import {Link} from "react-router-dom";
import PrivateLayout from "../../layouts/PrivateLayout";
import TableLayout from "../../layouts/TableLayout";
import ParticipationBadge from "../../components/ParticipationBadge";
import UnreadBadge from "../../components/UnreadBadge";
import PinnedBadge from "../../components/PinnedBadge";
import TopicForm from "../../components/TopicForm";
import Loader from "../../components/Loader";
import Breadcrumbs from "../../components/Breadcrumbs";

// TODO: Modifier l'évènement
// TODO: Indiquer sa participation
// TODO: Gestion de la galerie
// TODO: Description interne et publique

export default class Evenement extends React.Component {

    state = {
        event: null,
        modal: false
    };

    constructor(props) {
        super(props);
        this.getEvent = this.getEvent.bind(this);
    }

    componentDidMount() {
        this.getEvent();
    }

    getEvent() {
        $.ajax({
            url: Config.apiUrl + "/calendar/" + this.props.match.params.event,
            method: "GET",
            success: res => {
                res.topics = res.topics.sort((a, b) => b.lastMessage.created.localeCompare(a.lastMessage.created));
                res.topics = res.topics.sort((a, b) => b.pinned - a.pinned);
                this.setState({event: res});
            }
        });
    }

    render() {
        let event = this.state.event;
        if (!event) return <Loader/>;
        let levels = [
            {label: "Calendrier", url: "/intranet/calendrier"},
            {label: event.title},
        ];
        return (
            <PrivateLayout>
                <Breadcrumbs levels={levels}/>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-md-6 py-2">
                            {this.renderDetails(event)}
                        </div>
                        <div className="col-12 col-md-6 py-2">
                            <button className="btn btn-info w-100 mb-2" onClick={() => this.setState({modal: true})}>
                                <FontAwesomeIcon icon={"plus"} className="mr-2"/>
                                Nouveau sujet
                            </button>
                            {this.renderTopics()}
                        </div>
                        <div className="col-12 py-2">
                            {this.renderParticipants(event)}
                        </div>
                    </div>
                </div>
                {this.state.modal &&
                <TopicForm onSend={this.getEvent} event={this.state.event}
                           onClose={() => this.setState({modal: false})}/>
                }
            </PrivateLayout>
        );
    }

    renderDetails(event) {
        return (
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{event.title}</h3>
                    <p className="card-text">{event.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{this.renderDate(event)}</li>
                    <li className="list-group-item">
                        <FontAwesomeIcon icon="eye" className="mr-2"/>
                        {Config.privacy[event.privacy]}
                    </li>
                </ul>
            </div>
        );
    }

    renderDate(event) {
        return (
            <span>
                <FontAwesomeIcon icon={["far", "calendar-alt"]} className="mr-2"/>
                <span>{CF.getDate(event.start)}</span>
                {(event.end && event.end !== event.start) &&
                <span>
                    <FontAwesomeIcon icon="arrow-right" className="mx-2"/>
                    <span>{CF.getDate(event.end)}</span>
                </span>
                }
            </span>
        );
    }

    renderParticipants(event) {
        let dates = CF.getDatesBetween(event.start, event.end);
        let defaultParticipations = {};
        for (let date of dates) defaultParticipations[date] = {
            date: date,
            status: "t"
        };

        let members = {};
        for (let p of event.participations) {
            let date = moment(p.day).format("YYYY-MM-DD");
            if (!members[p.user.id]) {
                members[p.user.id] = {
                    user: p.user,
                    participations: JSON.parse(JSON.stringify(defaultParticipations))
                };
            }
            members[p.user.id].participations[date].status = p.status;
        }

        members = CF.objectToArray(members);
        members = members.map(m => {
            m.participations = CF.objectToArray(m.participations);
            return m;
        });

        return (
            <div className="w-100 overflow-auto my-3">
                <TableLayout>
                    <tr>
                        <td/>
                        {dates.map(d => {
                            let date = moment(d);
                            return (
                                <td className="text-secondary small-caps text-center" key={d}>
                                    {date.format("ddd")} <br/>
                                    {date.format("DD.MM")}
                                </td>
                            );
                        })}
                    </tr>
                    {members.map(m =>
                        <tr>
                            <td>{CF.getName(m.user, true)}</td>
                            {m.participations.map(p =>
                                <td className="text-center"><ParticipationBadge status={p.status}/></td>
                            )}
                        </tr>
                    )}
                </TableLayout>
            </div>
        );
    }

    renderTopics() {
        return (
            <ul className="list-group">
                {this.state.event.topics.map(t =>
                    <Link
                        className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
                        to={"/intranet/forum/topic/" + t.id} key={t.id}>
                        <div className="pr-3"><UnreadBadge read={t.read}/></div>
                        <div className="pr-3"><PinnedBadge pinned={t.pinned}/></div>
                        <div>
                            <span className="d-block small-caps">{t.title}</span>
                            <span className="d-block">
                        {CF.getName(t.lastMessage.author, true) + " a posté " + CF.fromNow(t.lastMessage.created)}
                            </span>
                        </div>
                    </Link>
                )}
            </ul>
        );
    }
}
