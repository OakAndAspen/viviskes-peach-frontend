import PublicLayout from "layouts/PublicLayout";
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import PublicGalleryModal from "modals/PublicGalleryModal";
import React from "react";
import {api, getDate} from "utils";

export default class Galerie extends React.Component {

    state = {
        events: [],
        currentEvent: null
    };

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        api("GET", "/public/events", {}, ({status, data}) => {
            if (status === 200) this.setState({
                events: data
                    .filter(e => e.photos.length > 0)
                    .sort((a, b) => b.start.localeCompare(a.start))
            });
        });
    }

    render() {
        return (
            <PublicLayout>
                <div className="container my-4">
                    <div className="row">
                        <div className="col-12 col-sm-8 col-md-6 mx-auto">
                            {this.renderEvents()}
                        </div>
                    </div>
                </div>
                {this.state.currentEvent &&
                <PublicGalleryModal event={this.state.currentEvent}
                                    onClose={() => this.setState({currentEvent: null})}/>
                }
            </PublicLayout>
        );
    }

    renderEvents() {
        return (
            <ul className="list-group">
                {this.state.events.map(e => {
                    return (
                        <li className="list-group-item list-group-item-action pointer d-flex" key={e.id}
                            onClick={() => this.setState({currentEvent: e})}>
                            <span className="display-2 mr-4 text-secondary d-flex align-items-center">
                                <FAI icon="images"/>
                            </span>
                            <div>
                                <span className="small-caps">{e.title}</span>
                                <br/>
                                <span className="text-secondary">
                                    <FAI icon={"calendar"}/>
                                    <span className="mx-2">{getDate(e.start)}</span>
                                    <FAI icon={"map-marker-alt"}/>
                                    <span className="mx-2">{e.location}</span>
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
}
