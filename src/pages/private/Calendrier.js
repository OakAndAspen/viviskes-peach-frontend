import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import Breadcrumbs from "components/Breadcrumbs";
import UnreadBadge from "components/UnreadBadge";
import {apiUrl, privacy} from "config";
import $ from "jquery";
import PrivateLayout from "layouts/PrivateLayout";
import TableLayout from "layouts/TableLayout";
import React from "react";
import {fromNow, getDate, isFuture} from "utils";

export default class Calendrier extends React.Component {

    state = {
        futureEvents: [],
        pastEvents: []
    };

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        $.ajax({
            url: apiUrl + "/calendar",
            method: "GET",
            success: res => {
                res.sort((a, b) => a.start.localeCompare(b.start));
                let futureEvents = res.filter(e => isFuture(e.start));
                let pastEvents = res.filter(e => !isFuture(e.start));
                this.setState({
                    futureEvents: futureEvents,
                    pastEvents: pastEvents,
                });
            }
        });
    }

    render() {
        let levels = [{label: "Calendrier"}];
        return (
            <PrivateLayout>
                <Breadcrumbs levels={levels}/>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h2 className="text-center">Prochains évènements</h2>
                            {this.renderEvents(this.state.futureEvents)}
                        </div>
                        <div className="col-12 col-lg-6">
                            <h2 className="text-center">Evènements passés</h2>
                            {this.renderEvents(this.state.pastEvents)}
                        </div>
                    </div>
                </div>
            </PrivateLayout>
        );
    }

    renderEvents(events) {
        return (
            <TableLayout hoverable={true}>
                {events.map(e =>
                    <tr key={e.id} className="pointer"
                        onClick={() => this.props.history.push("/intranet/calendrier/" + e.id)}>
                        <td className="text-center">
                            <UnreadBadge read={e.read}/>
                        </td>
                        <td>
                            <span className="small-caps">{e.title}</span><br/>
                            <span className="text-muted">
                                        <FAI icon="eye" className="mr-2"/>
                                {privacy[e.privacy]}
                                <FAI icon="calendar" className="mx-2"/>
                                {getDate(e.start)} ({fromNow(e.start)})
                                    </span>
                        </td>
                    </tr>
                )}
            </TableLayout>
        );
    }
}
