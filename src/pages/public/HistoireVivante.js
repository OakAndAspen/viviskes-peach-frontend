import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import Loader from "components/Loader";
import PublicLayout from "layouts/PublicLayout";
import React from "react";
import {api, getDate} from "utils";

export default class HistoireVivante extends React.Component {

    state = {
        tags: [],
        articles: [],
        selectedTags: []
    };

    componentDidMount() {
        this.getTags();
        this.getArticles();
    }

    getArticles() {
        api("GET", "/public/articles", {}, ({status, data}) => {
            if (data) this.setState({
                articles: data
                    .filter(a => a.isPublished)
                    .sort((a, b) => b.created.localeCompare(a.created))
            });
        });
    }

    getTags() {
        api("GET", "/public/tags", {}, ({status, data}) => {
            if (data) this.setState({tags: data.sort((a, b) => a.label.localeCompare(b.label))});
        });
    }

    toggleTag(id) {
        let sel = this.state.selectedTags;
        let index = sel.indexOf(id);
        index === -1 ? sel.push(id) : sel.splice(index, 1);
        this.setState({selectedTags: sel});
    }

    filterArticles() {
        let articles = this.state.articles;
        if (!this.state.selectedTags.length) return articles;
        articles = articles.filter(a => {
            let containsTag = false;
            for (let tagId of this.state.selectedTags) {
                for (let tag of a.tags) {
                    if (tag.id === tagId) containsTag = true;
                }
            }
            return containsTag;
        });
        return articles;
    }

    render() {
        return (
            <PublicLayout>
                <div className="container py-4">
                    {!this.state.articles.length ? <Loader/> :
                        <div className="row">
                            <div className="col-12 col-md-4 order-md-2">
                                {this.renderTags()}
                            </div>
                            <div className="col-12 col-md-8">
                                {this.renderArticles()}
                            </div>
                        </div>
                    }
                </div>
            </PublicLayout>
        );
    }

    renderTags() {
        return (
            <div>
                {this.state.tags.map(t => {
                    let color = this.state.selectedTags.indexOf(t.id) === -1 ? "secondary" : "info";
                    return (
                        <span className={"badge badge-" + color + " pointer font-weight-light p-2 mr-2 mb-2"} key={t.id}
                              onClick={() => this.toggleTag(t.id)}>
                            {t.label}
                        </span>
                    );
                })}
            </div>
        );
    }

    renderArticles() {

        let articles = this.filterArticles();
        if (!articles.length) return (
            <div className="alert alert-light mt-2 text-center">
                Aucun article ne correspond à vos critères.
            </div>
        );

        return (
            <ul className="list-group">
                {articles.map(a =>
                    <button className="list-group-item list-group-item-action d-flex align-items-center"
                            onClick={() => this.props.history.push("/histoire-vivante/" + a.id)}
                            key={a.id}>
                        <FAI icon={"feather-alt"} className="text-secondary mr-4"/>
                        <div>
                            <h5 className="m-0">{a.title}</h5>
                            <small className="small-caps text-muted">
                                {"Par " + a.author.firstName + " " + a.author.lastName + " | " +
                                getDate(a.created)}
                            </small>
                            <br/>
                            <span>
                            {a.tags.map(t =>
                                <span className="badge badge-secondary pointer font-weight-light p-1 mr-2"
                                      key={t.id}>{t.label}</span>)}
                            </span>
                        </div>
                    </button>
                )}
            </ul>
        );
    }
}
