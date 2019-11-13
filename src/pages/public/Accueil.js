import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import WysiwygDisplay from "components/WysiwygDisplay";
import PublicLayout from "layouts/PublicLayout";
import React from "react";
import {api, getDate, isFuture} from "utils";

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
        api("GET", "/public/partners", {}, ({status, data}) => {
            if (data) {
                data.sort((a, b) => a.label.localeCompare(b.label));
                this.setState({partners: data});
            }
        });
    }

    getEvents() {
        api("GET", "/public/events", {}, ({status, data}) => {
            if (data) {
                data = data
                    .filter(e => isFuture(e.start) && e.privacy === "u" && e.isConfirmed)
                    .sort((a, b) => a.start.localeCompare(b.start));
                this.setState({events: data});
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
                            <h2>À propos de Viviskes</h2>
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
        if(!this.state.events.length) return <div className="alert alert-light">
            Nous n'avons pas d'évènements publics prévus pour le moment. Nous sommes ouverts aux propositions!
        </div>;

        return (
            <ul className="list-group">
                {this.state.events.map(e =>
                    <button className="list-group-item list-group-item-action" key={e.id}
                            onClick={() => this.setState({selectedEvent: e.id})}>
                        <div className="d-flex align-items-center ">
                            <FAI icon={["far", "calendar-alt"]} className="text-secondary display-3 mr-4"/>
                            <div>
                                <h4 className="small-caps">{e.title}</h4>
                                <span className="small-caps text-muted">
                                <FAI icon={"map-marker-alt"} className="mr-2"/>
                                <span className="mr-2">{e.location}</span>
                                <FAI icon={"calendar-day"} className="mr-2"/>
                                <span className="mr-2">
                                    {getDate(e.start) +
                                    (e.end ? " - " + getDate(e.end) : "")}
                                </span>
                            </span>
                            </div>
                            <FAI icon={["far", "info-circle"]} className="text-info display-3 ml-auto"
                                 title="Plus d'infos..."/>
                        </div>
                        {this.state.selectedEvent === e.id && <div className="mt-3">
                            <WysiwygDisplay content={e.description}/>
                        </div>}
                    </button>
                )}
            </ul>
        );
    }

    renderPartners() {
        return (
            <ul className="list-group">
                {this.state.partners.map(p =>
                    <li className="list-group-item" key={p.id}>
                        <div className="d-flex align-items-center">
                            <FAI icon={["far", "handshake"]} className="text-secondary"/>
                            <span className="ml-3 small-caps">{p.label}</span>
                            {p.url &&
                            <a href={"http://" + p.url} className="ml-auto" title={p.url}
                               target="_blank" rel="noopener noreferrer">
                                <FAI icon={["far", "external-link"]}/>
                            </a>
                            }
                        </div>
                    </li>
                )}
            </ul>
        );
    }
}
