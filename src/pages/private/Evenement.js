import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import cn from "classnames";
import Breadcrumbs from "components/Breadcrumbs";
import Loader from "components/Loader";
import ParticipationBadge from "components/ParticipationBadge";
import PinnedBadge from "components/PinnedBadge";
import UnreadBadge from "components/UnreadBadge";
import WysiwygDisplay from "components/WysiwygDisplay";
import {privacy} from "config";
import PrivateLayout from "layouts/PrivateLayout";
import TableLayout from "layouts/TableLayout";
import CreateTopicModal from "modals/CreateTopicModal";
import UpdateEventModal from "modals/UpdateEventModal";
import UpdateGalleryModal from "modals/UpdateGalleryModal";
import UpdateParticipationModal from "modals/UpdateParticipationModal";
import moment from "moment";
import React from "react";
import {Link} from "react-router-dom";
import {api, fromNow, getDate, getDatesBetween, getName} from "utils";

export default class Evenement extends React.Component {

    state = {
        event: null,
        modal: null,
        user: JSON.parse(localStorage.getItem("user"))
    };

    constructor(props) {
        super(props);
        this.getEvent = this.getEvent.bind(this);
    }

    componentDidMount() {
        this.getEvent();
    }

    getEvent() {
        api("GET", "/event/" + this.props.match.params.event, {}, ({status, data}) => {
            if (data) {
                data.topics = data.topics
                    .sort((a, b) => b.lastMessage.created.localeCompare(a.lastMessage.created))
                    .sort((a, b) => b.pinned - a.pinned);
                this.setState({event: data});
            }
        });
    }

    calculateParticipations(dates) {
        let event = this.state.event;
        let participations = event.participations;
        let authUser = this.state.user;

        // Create default participations array
        let defaultParticipations = [];
        for (let date of dates) {
            defaultParticipations.push({
                date: date,
                status: "t"
            });
        }

        // Create users array with default participations
        let members = [];
        members.push({
            user: authUser,
            participations: defaultParticipations
        });

        for (let p of participations) {
            let existingUser = members.find(u => u.user.id === p.user.id);
            if (!existingUser) {
                members.push({
                    user: p.user,
                    participations: JSON.parse(JSON.stringify(defaultParticipations))
                });
            }
        }

        // Assign existing participations
        for (let p of participations) {
            let date = moment(p.day).format("YYYY-MM-DD");
            members = members.map(m => {
                if (m.user.id === p.user.id) {
                    m.participations = m.participations.map(part => {
                        if (part.date === date) part.status = p.status;
                        return part;
                    });
                }
                return m;
            });
        }

        return members;
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
                            {this.renderDetails()}
                        </div>
                        <div className="col-12 col-md-6 py-2">
                            <button className="btn btn-info w-100 mb-2"
                                    onClick={() => this.setState({modal: "createTopic"})}>
                                <FAI icon={"plus"} className="mr-2"/>
                                Nouveau sujet
                            </button>
                            {this.renderTopics()}
                        </div>
                        <div className="col-12 py-2">
                            {this.renderParticipants()}
                        </div>
                    </div>
                </div>

                {/* --- MODALS --- >*/}
                {this.state.modal === "createTopic" &&
                <CreateTopicModal onSend={this.getEvent} event={this.state.event}
                                  onClose={() => this.setState({modal: null})}/>
                }
                {this.state.modal === "updateEvent" &&
                <UpdateEventModal onSend={this.getEvent} event={this.state.event}
                                  onClose={() => this.setState({modal: null})}/>
                }
                {this.state.modal === "updateGallery" &&
                <UpdateGalleryModal event={this.state.event}
                                    onClose={() => this.setState({modal: null})}/>
                }
                {this.state.modal === "updateParticipation" &&
                <UpdateParticipationModal
                    event={this.state.event}
                    user={this.state.user}
                    date={this.state.currentDate}
                    onUpdate={this.getEvent}
                    onClose={() => this.setState({modal: null})}/>
                }
            </PrivateLayout>
        );
    }

    renderDetails() {
        let event = this.state.event;
        return (
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">
                        {event.title}
                        <small className="ml-2 pointer text-info" title="Modifier l'évènement"
                               onClick={() => this.setState({modal: "updateEvent"})}>
                            <FAI icon="pencil"/>
                        </small>
                        {this.state.user.isAdmin &&
                        <small className="ml-2 pointer text-info" title="Gérer la galerie"
                               onClick={() => this.setState({modal: "updateGallery"})}>
                            <FAI icon="images"/>
                        </small>
                        }
                    </h3>
                    <p className="card-text">
                        <WysiwygDisplay content={event.description}/>
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        {this.renderDate(event)}
                    </li>
                    <li className="list-group-item">
                        <FAI icon="map-marker-alt" className="mr-2"/>
                        {event.location}
                    </li>
                    <li className="list-group-item">
                        <FAI icon="eye" className="mr-2"/>
                        {privacy[event.privacy]}
                        <FAI icon={event.isConfirmed ? "check" : "clock"} className="mx-2"/>
                        {event.isConfirmed ? "Confirmé" : "Proposition"}
                    </li>
                </ul>
            </div>
        );
    }

    renderDate() {
        let event = this.state.event;
        return (
            <span>
                <FAI icon={["far", "calendar-alt"]} className="mr-2"/>
                <span>{getDate(event.start)}</span>
                {(event.end && event.end !== event.start) &&
                <span>
                    <FAI icon="arrow-right" className="mx-2"/>
                    <span>{getDate(event.end)}</span>
                </span>
                }
            </span>
        );
    }

    renderParticipants() {
        let event = this.state.event;
        let dates = getDatesBetween(event.start, event.end);
        let array = this.calculateParticipations(dates);

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
                    {array.map(m => {
                        let isAuthUser = this.state.user.id === m.user.id;
                        let style = {backgroundColor: "rgba(219,211,203,0.3)"};
                        return (
                            <tr key={m.user.id} style={isAuthUser ? style : null}>
                                <td>{getName(m.user, true)}</td>
                                {m.participations.map(p =>
                                    <td className="text-center" key={m.id + "-" + p.date}>
                                        <span className={cn(isAuthUser && "rounded border pointer bg-light p-2")}
                                              onClick={!isAuthUser ? null : () => this.setState({
                                                  modal: "updateParticipation",
                                                  currentDate: p.date
                                              })}>
                                            <ParticipationBadge status={p.status}/>
                                        </span>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
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
                        {getName(t.lastMessage.author, true) + " a posté " + fromNow(t.lastMessage.created)}
                            </span>
                        </div>
                    </Link>
                )}
            </ul>
        );
    }
}
