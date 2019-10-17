import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import cn from "classnames";
import PrivateLayout from "layouts/PrivateLayout";
import CreateArticleModal from "modals/CreateArticleModal";
import ShowArticleModal from "modals/ShowArticleModal";
import UpdateArticleModal from "modals/UpdateArticleModal";
import React from "react";
import {api, getDate, getName} from "utils";

export default class Articles extends React.Component {

    state = {
        articles: [],
        search: "",
        modal: null,
        article: null,
        user: JSON.parse(localStorage.getItem("user"))
    };

    constructor(props) {
        super(props);
        this.getArticles = this.getArticles.bind(this);
    }

    componentDidMount() {
        this.getArticles();
    }

    getArticles() {
        api("GET", "/article", {}, ({status, data}) => {
            if (data) {
                this.setState({articles: data.sort((a, b) => b.created.localeCompare(a.created))});
            }
        });
    }

    showDetails(id, edit) {
        api("GET", "/article/" + id, {}, ({status, data}) => {
            let modal = edit ? "updateArticle" : "showArticle";
            if (data) this.setState({article: data, modal: modal});
        });
    }

    toggleValidation(article) {
        let form = {isPublished: !article.isPublished};
        api("PUT", "/article/" + article.id, {article: form}, ({status, data}) => {
            if (status === 200) {
                this.getArticles();
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
                            {this.renderList()}
                        </div>
                    </div>
                </div>
                {this.state.modal === "createArticle" && <CreateArticleModal
                    onClose={() => this.setState({modal: null})}
                    onCreate={this.getArticles}/>}
                {this.state.modal === "updateArticle" && <UpdateArticleModal
                    article={this.state.article}
                    onClose={() => this.setState({modal: null, article: null})}
                    onUpdate={this.getArticles}/>}
                {this.state.modal === "showArticle" && <ShowArticleModal
                    article={this.state.article}
                    onClose={() => this.setState({modal: null, article: null})}/>}
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
                            onClick={() => this.setState({modal: "createArticle"})}>
                        <FAI icon={"pen-fancy"} className="mr-2"/>
                        <span>Nouvel article</span>
                    </button>
                </div>
            </div>
        );
    }

    renderList() {
        let search = this.state.search.toLowerCase();
        let articles = this.state.articles.filter(u => u.title.toLowerCase().includes(search));

        return (
            <ul className="list-group">
                {articles.map(a => {
                        return (
                            <li className="list-group-item d-flex" key={a.id}>
                                <span>
                                    <FAI icon={["fas", "feather-alt"]}/>
                                </span>
                                {this.renderInfo(a)}
                                {this.renderActions(a)}
                            </li>
                        );
                    }
                )}
            </ul>
        );
    }

    renderInfo(article) {
        return (
            <span className="mx-3">
                <span>
                    <span className="text-center mr-2">
                    {article.isPublished ?
                        <FAI icon={["fal", "check-circle"]} title={"Publié"}/> :
                        <FAI icon={["fal", "spinner"]} title={"En attente de validation"}/>}
                    </span>
                    {article.title}
                </span>
                <br/>
                <small className="text-muted">
                    Par {getName(article.author)} | {getDate(article.created)}
                </small>
            </span>
        );
    }

    renderActions(article) {
        let isAdmin = this.state.user.isAdmin;
        let isPublished = article.isPublished;

        return (
            <span className="ml-auto d-flex justify-content-end">
                {this.state.user.id === article.author.id &&
                <span className="ml-2 text-info pointer" title="Modifier l'article"
                      onClick={() => this.showDetails(article.id, true)}>
                    <FAI icon={["fal", "pen"]}/>
                </span>}

                {isAdmin &&
                <span className={cn("pointer ml-2", isPublished ? "text-danger" : "text-success")}
                      title={isPublished ? "Dépublier" : "Publier"}
                      onClick={() => this.toggleValidation(article)}>
                    <FAI icon={["fal", isPublished ? "times" : "check"]}/>
                </span>}

                <span className="ml-2 text-info pointer" title="Lire l'article"
                      onClick={() => this.showDetails(article.id, false)}>
                    <FAI icon={["fal", "eye"]}/>
                </span>
            </span>
        );
    }
}
