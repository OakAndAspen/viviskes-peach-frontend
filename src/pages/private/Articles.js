import React from 'react';
import PrivateLayout from "../../components/PrivateLayout";
import $ from "jquery";
import Config from "../../Config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalLayout from "../../components/ModalLayout";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class Articles extends React.Component {

    messages = {
        emptyField: "Le titre et le contenu sont obligatoires.",
        success: "L'article a bien été enregistré!"
    };

    defaultArticle = {
        title: "",
        content: ""
    };

    state = {
        allArticles: [],
        search: "",
        modal: false,
        article: null,
        newArticle: this.defaultArticle,
        alert: null,
        alertType: "danger",
    };

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        this.getAllArticles();
    }

    getAllArticles() {
        $.ajax({
            url: Config.apiUrl + "/articles",
            method: "GET",
            success: res => {
                res.sort((a, b) => b.created - a.created);
                this.setState({allArticles: res});
            }
        });
    }

    showDetails(id) {
        this.setState({modal: true});
        $.ajax({
            url: Config.apiUrl + "/articles/" + id,
            method: "GET",
            success: res => {
                this.setState({article: res});
            }
        });
    }

    filterArticles() {
        let search = this.state.search.toLowerCase();
        let filtered = this.state.allArticles.filter(u => {
            if (u.title.toLowerCase().includes(search)) return true;
            return false;
        });
        return filtered;
    }

    updateField(field, value) {
        let a = this.state.article || this.state.newArticle;
        a[field] = value;
        this.setState({newArticle: a});
    }

    checkErrors() {
        let a = this.state.article || this.state.newArticle;

        if (!a.title || !a.content) {
            this.setState({alert: this.messages.emptyField, alertType: "danger"});
            return false;
        }

        return true;
    }

    send() {
        if (!this.checkErrors()) return null;
        let data = this.state.article || this.state.newArticle;

        $.ajax({
            url: Config.apiUrl + "/articles" + (this.state.article ? "/" + this.state.article.id : ""),
            method: this.state.article ? "PATCH" : "POST",
            data: data,
            success: res => {
                this.setState({
                    alert: this.messages.success,
                    alertType: "success",
                    modal: false,
                    newArticle: this.defaultArticle,
                    article: null
                });
                this.getAllArticles();
            }
        });
    }

    render() {
        return (
            <PrivateLayout>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-md-8 col-lg-6 mx-auto">
                            {this.renderSearchAndNew()}
                            {this.state.alert &&
                            <div className={"alert alert-" + this.state.alertType}>{this.state.alert}</div>
                            }
                            {this.renderList()}
                        </div>
                    </div>
                </div>
                {this.renderModal()}
            </PrivateLayout>
        );
    }

    renderSearchAndNew() {
        return (
            <div className="row">
                <div className="col-12 col-sm-6">
                    <input type="text" placeholder="Cherche un article..." className="form-control my-2"
                           value={this.state.search} onChange={e => this.setState({search: e.target.value})}/>
                </div>
                <div className="col-12 col-sm-6">
                    <button type="button" className="btn btn-info w-100 my-2"
                            onClick={() => this.setState({modal: true})}>
                        <FontAwesomeIcon icon={"pen-fancy"} className="mr-2"/>
                        <span>Nouvel article</span>
                    </button>
                </div>
            </div>
        );
    }

    renderList() {
        return (
            <ul className="list-group">
                {this.filterArticles().map(a =>
                    <button type="button" className="list-group-item list-group-item-action d-flex" key={a.id}
                            onClick={() => this.showDetails(a.id)}>
                        <span><FontAwesomeIcon icon={["fal", "feather-alt"]}/></span>
                        <span className="mx-3">{a.title}</span>
                        <span className="ml-auto text-info" title="Modifier l'article">
                            <FontAwesomeIcon icon={["fal", "pen"]}/>
                        </span>
                    </button>
                )}
            </ul>
        );
    }

    renderModal() {
        if (!this.state.modal) return null;
        let a = this.state.article || this.state.newArticle;

        return (
            <ModalLayout title={this.state.article ? "Modifier l'article" : "Nouvel article"}
                         onClose={() => this.setState({
                             modal: false, article: null,
                             newArticle: this.defaultArticle
                         })}>
                <input type="text" className="form-control mb-3" placeholder="Titre de l'article"
                       value={a.title} onChange={e => this.updateField("title", e.target.value)}/>
                <CKEditor editor={ClassicEditor} data={a.content}
                          onChange={(event, editor) => this.updateField("content", editor.getData())}/>
                <button className="btn btn-info w-100 mt-3" onClick={this.send}>Enregistrer</button>
            </ModalLayout>
        );
    }
}
