import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import PrivateLayout from "layouts/PrivateLayout";
import CreateArticleModal from "modals/CreateArticleModal";
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

    showDetails(id) {
        api("GET", "/article/" + id, {}, ({status, data}) => {
            if (data) this.setState({article: data, modal: "updateArticle"});
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
                {articles.map(a =>
                    <li className="list-group-item d-flex" key={a.id}>
                        <span>
                            {a.isPublished ?
                                <FAI icon={["fal", "check-circle"]} title={"Publié"}/>
                                : <FAI icon={["fal", "spinner"]} title={"En attente de validation"}/>}
                        </span>
                        <span className="mx-3">
                            <span>{a.title}</span>
                            {this.state.user.id === a.author.id &&
                            <span className="ml-2 text-info pointer" title="Modifier l'article"
                                  onClick={() => this.showDetails(a.id)}>
                                <FAI icon={["fal", "pen"]}/>
                            </span>
                            }
                            <br/>
                            <small className="text-muted">Par {getName(a.author)}</small>
                        </span>
                        <span className="ml-auto">{getDate(a.created)}</span>
                    </li>
                )}
            </ul>
        );
    }
}
