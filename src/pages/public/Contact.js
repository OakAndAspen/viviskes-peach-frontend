import React from 'react';
import Tabs from "../../components/Tabs";
import PublicLayout from "../../components/PublicLayout";

export default class Contact extends React.Component {

    render() {
        let entries = [
            {
                label: "Nos prestations",
                code: "prestations"
            },
            {
                label: "Nous rejoindre",
                code: "rejoindre"
            },
            {
                label: "Formulaire de contact",
                code: "formulaire"
            },
            {
                label: "Accès",
                code: "acces"
            }
        ];
        return (
            <PublicLayout>
                <div className="container py-4">
                    <Tabs entries={entries}/>
                    <div className="tab-content">
                        <div className="tab-pane active" id="prestations"
                             role="tabpanel" aria-labelledby="prestations-tab">
                            {this.renderPrestations()}
                        </div>
                        <div className="tab-pane" id="rejoindre"
                             role="tabpanel" aria-labelledby="rejoindre-tab">
                            {this.renderRejoindre()}
                        </div>
                        <div className="tab-pane" id="formulaire"
                             role="tabpanel" aria-labelledby="formulaire-tab">
                            {this.renderFormulaire()}
                        </div>
                        <div className="tab-pane" id="acces"
                             role="tabpanel" aria-labelledby="acces-tab">
                            {this.renderAcces()}
                        </div>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    renderPrestations() {
        return (
            <div>
                <p>Depuis 5 ans, nos quarante membres font partager leur amour de l’Antiquité à travers une très grande
                    variété d’animations destinées au public. Si nos activités vous intéressent, nous pouvons vous
                    proposer les animations suivantes :</p>

                <ul>
                    <li>Batailles scénarisées et duels (à l'interne ou en partenariat avec d'autres associations de
                        reconstitution historique)
                    </li>
                    <li>Initiations au combat/au tir de javelots pour adultes et enfants</li>
                    <li>Campement historique complet pour animer une manifestation</li>
                    <li>Stand informatif sur l'armement celte (sous la période laténienne) et sur la vie quotidienne des
                        Celtes (textile, cuisine, artisanat)
                    </li>
                    <li>Animation pédagogique, jeux et ateliers pour des scolaires</li>
                </ul>

                <p>Si l'une ou l'ensemble de ces prestations vous intéresse, n'hésitez pas à nous écrire via le
                    formulaire de contact et nous vous répondrons dans les plus brefs délais.</p>
            </div>
        );
    }

    renderRejoindre() {
        return (
            <div>
                <p>Tu es intéressé par l'histoire antique? Passionné du monde des Celtes? Tu en as marre de croire que
                    les Celtes ne mangeaient que du sanglier? Tu aimerais avoir une pratique sportive et artisanale
                    originale ?</p>
                <p>Alors Viviskes est fait pour toi !</p>
                <p>Notre association est basée à Vevey (Suisse) et organise régulièrement des entraînements et des
                    évènements. Prends contact avec nous via le formulaire de contact et nous te convierons avec plaisir
                    à l'un de nos entraînements!</p>
                <p>Viviskes apporte:</p>
                <ul>
                    <li>Un approfondissement original d'une période mal connue de l'histoire antique</li>
                    <li>La possibilité de développer des talents artisanaux via la reconstitution de costumes et
                        équipements celtes
                    </li>
                    <li>Une pratique sportive relativement intensive dans un cadre détendu</li>
                    <li>Une expérience humaine forte dans un groupe de passionnés d'histoire!</li>
                </ul>
                <p>Nos entraînements se déroulent de mars à octobre à Vevey au terrain de sport de Crédeiles, le jeudi à
                    partir de 18h00.</p>
            </div>
        );
    }

    renderFormulaire() {
        return (
            <div className="row">
                <div className="col-md-8 col-lg-6 mx-auto">
                    <input type="text" placeholder="Prénom et nom" className="form-control mb-2"/>
                    <input type="text" placeholder="Email" className="form-control mb-2"/>
                    <input type="text" placeholder="Sujet" className="form-control mb-2"/>
                    <textarea placeholder="Votre message" className="form-control mb-2"/>
                    <button className="btn btn-info w-100">Envoyer</button>
                </div>
            </div>
        );
    }

    renderAcces() {
        return (
            <div>

            </div>
        );
    }

}
