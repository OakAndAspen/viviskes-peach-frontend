import Breadcrumbs from "components/Breadcrumbs";
import Loader from "components/Loader";
import {apiUrl} from "config";
import $ from "jquery";
import PublicLayout from "layouts/PublicLayout";
import React from "react";
import {getDate} from "utils";

let HtmlToReactParser = require('html-to-react').Parser;

export default class Article extends React.Component {

    state = {
        article: null
    };

    componentDidMount() {
        this.getArticle();
    }

    getArticle() {
        $.ajax({
            url: apiUrl + "/articles/" + this.props.match.params.article,
            method: "GET",
            success: res => {
                this.setState({article: res});
            }
        });
    }

    render() {
        let levels = [
            {label: "Articles", url: "/histoire-vivante"},
            {label: this.state.article ? this.state.article.title : "Chargement..."}
        ];
        return (
            <PublicLayout>
                <Breadcrumbs levels={levels}/>
                <div className="container py-4">
                    {!this.state.article ? <Loader/> : this.renderArticle()}
                </div>
            </PublicLayout>
        );
    }

    renderArticle() {
        let a = this.state.article;
        let parser = new HtmlToReactParser();
        return (
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title m-0">{a.title}</h2>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-muted small-caps">
                        {a.author.firstName} {a.author.lastName}, {getDate(a.created)}
                    </li>
                </ul>
                <div className="card-body">
                    {parser.parse(a.content)}
                </div>
            </div>
        );
    }
}
