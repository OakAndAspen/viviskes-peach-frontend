import React from 'react';
import PrivateLayout from "../../layouts/PrivateLayout";
import Config from "../../Config";
import $ from "jquery";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TableLayout from "../../layouts/TableLayout";

export default class Calendrier extends React.Component {

    state = {
        events: []
    };

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        $.ajax({
            url: Config.apiUrl + "/calendar",
            method: "GET",
            success: res => {
                res.sort((a, b) => moment(a.start) - moment(b.start));
                this.setState({events: res});
            }
        });
    }

    render() {
        return (
            <PrivateLayout>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h1>Prochains évènements</h1>
                            <TableLayout hoverable={true}>
                                {this.state.events.map(e =>
                                    <tr key={e.id} className="pointer"
                                        onClick={() => this.props.history.push("/intranet/calendrier/" + e.id)}>
                                        <td className="text-center">
                                            <FontAwesomeIcon icon="dot-circle" className="text-info"/>
                                        </td>
                                        <td className="text-center">
                                            <FontAwesomeIcon icon={["far", "calendar-plus"]} className="ml-2"/>
                                            <FontAwesomeIcon icon={["far", "calendar-check"]} className="ml-2"/>
                                            <FontAwesomeIcon icon={["far", "calendar-times"]} className="ml-2"/>
                                        </td>
                                        <td>
                                            <span className="small-caps">{e.title}</span><br/>
                                            <span className="text-muted">
                                        <FontAwesomeIcon icon="eye" className="mr-2"/>
                                                {Config.privacy[e.privacy]}
                                                <FontAwesomeIcon icon="calendar" className="mx-2"/>
                                                {moment(e.start).format("DD.MM.YYYY")} ({moment(e.start).fromNow()})
                                    </span>
                                        </td>
                                    </tr>
                                )}
                            </TableLayout>
                        </div>
                        <div className="col-12 col-lg-6">
                            <h1>Evénements passés</h1>
                        </div>
                    </div>
                </div>
            </PrivateLayout>
        );
    }
}
