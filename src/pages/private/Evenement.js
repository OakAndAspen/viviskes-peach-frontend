import React from 'react';
import PrivateLayout from "../../layouts/PrivateLayout";
import $ from "jquery";
import Config from "../../Config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CF from "../../CustomFunctions";

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
        if (!event) return <h1>Loading...</h1>;
        return (
            <PrivateLayout>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            {this.renderDetails(event)}
                        </div>
                        <div className="col-12 col-md-6">
                            <h1>Discussions</h1>
                        </div>
                        <div className="col-12">
                            <h1>Participants</h1>
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
                    <h5 className="card-title">{event.title}</h5>
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
        let date = [
            <FontAwesomeIcon icon={["far", "calendar-alt"]} className="mr-2"/>,
            <span>{CF.getDate(event.start)}</span>
        ];

        if (event.end && event.end !== event.start) {
            date.push(<FontAwesomeIcon icon="arrow-right" className="mx-2"/>);
            date.push(<span>{CF.getDate(event.end)}</span>);
        }
        return date;
    }
}
