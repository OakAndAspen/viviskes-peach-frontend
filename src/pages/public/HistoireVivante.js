import React from 'react';
import PublicLayout from "../../components/PublicLayout";
import Config from "../../Config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import $ from "jquery";
import moment from "moment";

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
        $.ajax({
            url: Config.apiUrl + "/articles",
            method: "GET",
            success: res => {
                res.sort((a, b) => b.created - a.created);
                this.setState({articles: res});
            }
        });
    }

    getTags() {
        $.ajax({
            url: Config.apiUrl + "/tags",
            method: "GET",
            success: res => {
                res.sort((a, b) => a.label.localeCompare(b.label));
                this.setState({tags: res});
            }
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
                    <div className="row">
                        <div className="col-12 col-md-4 order-md-2">
                            {this.renderTags()}
                        </div>
                        <div className="col-12 col-md-8">
                            {this.renderArticles()}
                        </div>
                    </div>
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
        return (
            <ul className="list-group">
                {this.filterArticles().map(a =>
                    <button className="list-group-item list-group-item-action d-flex align-items-center"
                            onClick={() => this.props.history.push("/histoire-vivante/" + a.id)}>
                        <FontAwesomeIcon icon={"feather-alt"} className="text-secondary mr-4"/>
                        <div>
                            <h4 className="m-0">{a.title}</h4>
                            <small className="small-caps text-muted">
                                {"Par " + a.author.firstName + " " + a.author.lastName + " | " +
                                moment(a.created).format("DD.MM.YYYY")}
                            </small>
                        </div>
                    </button>
                )}
            </ul>
        );
    }
}
