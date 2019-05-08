import React from 'react';
import PrivateLayout from "../../layouts/PrivateLayout";
import Config from "../../Config";
import $ from "jquery";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ForumBreadcrumbs from "../../components/ForumBreadcrumbs";
import ModalLayout from "../../layouts/ModalLayout";

export default class Categorie extends React.Component {

    state = {
        modal: false,
        category: {
            topics: []
        }
    };

    componentDidMount() {
        let id = this.props.match.params.category;
        $.ajax({
            url: Config.apiUrl + "/category/" + id,
            method: "GET",
            success: res => {
                this.setState({category: res});
            }
        });
    }

    render() {
        return (
            <PrivateLayout>
                <ForumBreadcrumbs category={{label: this.state.category.label}}/>
                <div className="container py-4">
                    <div className="d-flex justify-content-between">
                        <h1>{this.state.category.label}</h1>
                        <div>
                            <button className="btn btn-info ml-auto"
                                    onClick={() => this.setState({modal: true})}>
                                <FontAwesomeIcon icon="plus" className="mr-2"/>
                                Créer un nouveau sujet
                            </button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {this.state.category.topics.map(t => this.renderTopic(t))}
                    </ul>
                </div>
                {this.state.modal && this.renderModal()}
            </PrivateLayout>
        );
    }

    renderTopic(t) {
        return (
            <Link className="list-group-item list-group-item-action" key={t.id}
                  to={"/intranet/forum/" + t.category.id + "/" + t.id}>
                <table>
                    <tbody>
                    <tr>
                        <td rowSpan="2">
                            <span className="badge badge-info mr-4">Non lu</span>
                        </td>
                        <td className="small-caps">
                            {t.title}
                        </td>
                    </tr>
                    <tr>
                        <td>Benjamin W. a posté il y a 6 heures</td>
                    </tr>
                    </tbody>
                </table>
            </Link>
        );
    }

    renderModal() {
        return (
            <ModalLayout title="Créer un sujet" onClose={() => this.setState({modal: false})}>
                <input type="text" className="form-control my-2" placeholder="Titre du sujet"/>
                <textarea className="form-control my-2" placeholder="Premier message"/>
                <button className="btn btn-info w-100">Poster</button>
            </ModalLayout>
        );
    }
}
