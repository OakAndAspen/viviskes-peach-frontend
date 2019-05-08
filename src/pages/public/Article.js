import React from 'react';
import PublicLayout from "../../components/PublicLayout";
import Config from "../../Config";
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import Loader from "../../components/Loader";
import {Link} from "react-router-dom";

let ReactDOMServer = require('react-dom/server');
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
            url: Config.apiUrl + "/articles/" + this.props.match.params.article,
            method: "GET",
            success: res => {
                this.setState({article: res});
            }
        });
    }

    render() {
        return (
            <PublicLayout>
                <div className="container py-4">
                    <Link to="/histoire-vivante" className="btn btn-info my-4">
                        <FontAwesomeIcon icon={"angle-double-left"} className="mr-2"/>
                        Retour aux articles
                    </Link>
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
                    <h4 className="card-title m-0">{a.title}</h4>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-muted small-caps">
                        {a.author.firstName} {a.author.lastName}, {moment(a.created).format("DD.MM.YYYY")}
                    </li>
                </ul>
                <div className="card-body">
                    {parser.parse(a.content)}
                </div>
            </div>
        );
    }
}
