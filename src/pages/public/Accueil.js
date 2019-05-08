import React from 'react';
import PublicLayout from "../../components/PublicLayout";
import Config from "../../Config";
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import {Link} from "react-router-dom";

export default class Accueil extends React.Component {

    state = {
        partners: [],
        events: [],
        selectedEvent: null
    };

    componentDidMount() {
        this.getPartners();
        this.getEvents();
    }

    getPartners() {
        $.ajax({
            url: Config.apiUrl + "/partners",
            method: "GET",
            success: res => {
                res.sort((a, b) => a.label.localeCompare(b.label));
                this.setState({partners: res});
            }
        });
    }

    getEvents() {
        $.ajax({
            url: Config.apiUrl + "/calendar",
            method: "GET",
            success: res => {
                res = res
                    .filter(e => moment(e.start).isAfter(moment()) && e.privacy === "p")
                    .sort((a, b) => a.start - b.start);
                this.setState({events: res});
            }
        });
    }

    render() {
        return (
            <PublicLayout>
                <img src="/images/divers/groupPhoto.png" alt="Viviskes aux Celtiques de Vivisco 2013"
                     className="img-fluid"/>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-lg-8">
                            <p>Si nous devions résumer en une seule question tout ce qui motive les quelques quarante
                                membres de l’association Viviskes, cela serait : comment vivaient les Celtes ?</p>

                            <p>Cette question, l’association d’anthropologie guerrière Viviskes essaie d’y répondre en
                                adoptant une approche pratique basée sur l’expérimentation, tout en profitant des
                                lumières des archéologues et artisans intégrés à l’association. Dans ce cadre, nous
                                proposons de nombreuses animations d'histoire vivante.</p>

                            <h3>Nos prochains évènements</h3>
                            {this.renderEvents()}
                        </div>
                        <div className="col-lg-4">
                            <h3>Nos partenaires</h3>
                            {this.renderPartners()}
                        </div>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    renderEvents() {
        return (
            <ul className="list-group">
                {this.state.events.map(e =>
                    <button className="list-group-item list-group-item-action"
                            onClick={() => this.setState({selectedEvent: e.id})}>
                        <div className="d-flex align-items-center ">
                            <FontAwesomeIcon icon={["far", "calendar-alt"]} className="text-secondary display-3 mr-4"/>
                            <div>
                                <h4 className="small-caps">{e.title}</h4>
                                <span className="small-caps text-muted">
                                <FontAwesomeIcon icon={"map-marker-alt"} className="mr-2"/>
                                <span className="mr-2">{e.location}</span>
                                <FontAwesomeIcon icon={"calendar-day"} className="mr-2"/>
                                <span className="mr-2">
                                    {moment(e.start).format("DD.MM.YYYY") +
                                    (e.end ? " - " + moment(e.end).format("DD.MM.YYYY") : "")}
                                </span>
                            </span>
                            </div>
                            <FontAwesomeIcon icon={["far", "info-circle"]} className="text-info display-3 ml-auto"
                                             title="Plus d'infos..."/>
                        </div>
                        {this.state.selectedEvent === e.id && <div className="mt-3">{e.description}</div>}
                    </button>
                )}
            </ul>
        );
    }

    renderPartners() {
        return (
            <ul className="list-group">
                {this.state.partners.map(p =>
                    <li className="list-group-item">
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={["far", "handshake"]} className="text-secondary"/>
                            <span className="ml-3 display-4 small-caps">{p.label}</span>
                            {p.url &&
                            <a href={"http://" + p.url} className="ml-auto" title={p.url}
                               target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={["far", "external-link"]}/>
                            </a>
                            }
                        </div>
                    </li>
                )}
            </ul>
        );
    }
}
