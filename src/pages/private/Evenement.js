import React from 'react';
import PrivateLayout from "../../layouts/PrivateLayout";
import $ from "jquery";
import Config from "../../Config";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CF from "../../CustomFunctions";
import Loader from "../../components/Loader";
import Breadcrumbs from "../../components/Breadcrumbs";
import TableLayout from "../../layouts/TableLayout";
import ParticipationBadge from "../../components/ParticipationBadge";

export default class Evenement extends React.Component {

    state = {
        event: null
    };

    componentDidMount() {
        $.ajax({
            url: Config.apiUrl + "/calendar/" + this.props.match.params.event,
            method: "GET",
            success: res => {
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
                        <div className="col-12 col-md-6">
                            {this.renderDetails(event)}
                        </div>
                        <div className="col-12 col-md-6">
                            <h1>Discussions</h1>
                        </div>
                        <div className="col-12">
                            {this.renderParticipants(event)}
                        </div>
                    </div>
                </div>
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
                            <td className="text-secondary small-caps text-center">
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
}
