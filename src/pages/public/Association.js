import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import Tabs from "components/Tabs";
import {apiUrl} from "config";
import PublicLayout from "layouts/PublicLayout";
import React from "react";
import {api} from "utils";

export default class Association extends React.Component {

    state = {
        members: []
    };

    componentDidMount() {
        this.getMembers();
    }

    getMembers() {
        api("GET", "/public/members", {}, ({status, data}) => {
            if (data) this.setState({members: data});
        });
    }

    render() {
        let entries = [
            {
                label: "Qui sommes-nous?",
                code: "qui-sommes-nous"
            },
            {
                label: "Nos buts et objectifs",
                code: "buts-objectifs"
            },
            {
                label: "Nos membres",
                code: "nos-membres"
            }
        ];
        return (
            <PublicLayout>
                <div className="container py-4">
                    <Tabs entries={entries}/>
                    <div className="tab-content">
                        <div className="tab-pane active" id="qui-sommes-nous">
                            {this.renderQuiSommesNous()}
                        </div>
                        <div className="tab-pane" id="buts-objectifs">
                            {this.renderButsObjectifs()}
                        </div>
                        <div className="tab-pane" id="nos-membres">
                            {this.renderNosMembres()}
                        </div>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    renderQuiSommesNous() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <img src="/images/divers/quiSommesNous.png" alt="Qui sommes-nous?"
                         className="img-fluid rounded mb-3"/>
                </div>
                <div className="col-md-8 text-justify">
                    <p>Viviskes est avant tout la rencontre de quelques quarante passionnés de l’Antiquité celtique
                        venant de divers horizons pour reconstituer la vie quotidienne et guerrière des Celtes de la
                        période laténienne (450-50 av. J.-C.). Ces objectifs sont atteints grâce à une approche
                        pratique,
                        basée sur l’expérimentation, tout en profitant des lumières des archéologues et artisans
                        partenaires
                        ou membres de l’association. Grâce à eux, nous sommes aujourd’hui à même de présenter une troupe
                        équipée, entraînée et fidèle aux sources historiques disponibles.</p>

                    <p>Rassemblés en 2011, nous nous sommes installés dans la région de Vevey et depuis lors, nous
                        n’avons
                        cessé de tenter de redonner vie à notre histoire commune et de valoriser le patrimoine culturel
                        lié
                        à la période laténienne.</p>

                    <p>Démonstration de combats, saynètes, stands, campement et interventions pédagogiques constituent
                        autant de moyens pour faire passer auprès du public notre passion pour cette période si souvent
                        évoquée et paradoxalement si mal connue. Viviskes est cependant bien plus que tout cela, notre
                        association est aussi et surtout le fruit d’une amitié qui s’est construite sur le long terme
                        entre
                        tous nos membres et reste une formidable aventure humaine et (proto)historique!</p>
                </div>
            </div>
        );
    }

    renderButsObjectifs() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <img src="/images/divers/butsObjectifs.png" alt="Nos buts et objectifs"
                         className="img-fluid rounded mb-3"/>
                </div>
                <div className="col-md-8 text-justify">
                    <p>Passionnés par l’Antiquité celte, nous cherchons à reconstituer le plus fidèlement l’équipement,
                        l’armement et le costume et les pratiques guerrières celtes. Il s’agit d’une part de développer
                        et de maintenir une exigence d’historicité de la part de nos membres et de l’autre de
                        transmettre les résultats de nos recherches et de nos expérimentations au public par le biais de
                        manifestations ou d’interventions dans divers cadres pédagogiques (scolaires, ateliers, portes
                        ouvertes).</p>
                    <p>Nous voyons notre rôle comme étant celui d’intermédiaires entre la difficulté des sources
                        académiques disponibles sur les Celtes et les clichés romantiques généralement attachés à cette
                        période que l’on trouve souvent dans les médias. Pour atteindre ces objectifs, nous tentons de
                        faire intervenir archéologues, historiens et artisans dans nos projets, de sorte à pouvoir
                        régulièrement questionner notre pratique de reconstitution.</p>
                    <p>Nous organisons des entraînements hebdomadaires afin de disposer d’une troupe capable de fournir
                        une évocation crédible du combat de cette période et nous nous retrouvons régulièrement pour
                        développer et partager les connaissances artisanales liées à la reconstitution celte. Dans cette
                        optique, nous avons aussi mis sur pied une bibliothèque d’association permettant à tous nos
                        membres de se documenter sur les Celtes. Tous ces efforts nous permettent de remplir l’exigence
                        de qualité que nous avons envers nous-même et surtout de donner à tout membre de l’association,
                        quel que soit son bagage, la capacité de développer sa passion pour l’Antiquité celtique.</p>
                </div>
            </div>
        );
    }

    renderNosMembres() {
        return (
            <div>
                {this.state.members.map(u => {
                    if (!u.hasPhoto) return null;
                    return (
                        <div className="col-6 col-md-4 col-lg-3">
                            <div className="card h-100">
                                <img className="card-img-top" alt={u.celticName}
                                     src={apiUrl + "/uploads/users/" + u.id + ".jpg"}/>
                                <div className="card-body text-center">
                                    <span className="card-title display-4">{u.celticName}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="col-12 small-caps display-4 my-4">
                    {this.state.members.map(u => {
                        if (u.hasPhoto) return null;
                        return (
                            <span>
                                <FAI icon={["fal", "swords"]}/>
                                <span className="mx-2">{u.celticName}</span>
                            </span>
                        );
                    })}
                </div>
            </div>
        );
    }
}
