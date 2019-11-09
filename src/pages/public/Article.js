import Breadcrumbs from "components/Breadcrumbs";
import Loader from "components/Loader";
import WysiwygDisplay from "components/WysiwygDisplay";
import PublicLayout from "layouts/PublicLayout";
import React from "react";
import {api, getDate} from "utils";

export default class Article extends React.Component {

    state = {
        article: null
    };

    componentDidMount() {
        this.getArticle();
    }

    getArticle() {
        api("GET", "/public/articles/" + this.props.match.params.article, {}, ({status, data}) => {
            if (data) this.setState({article: data});
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
        return (
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title m-0">{a.title}</h2>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-muted small-caps">
                        <span className="mr-3">{a.author.firstName} {a.author.lastName} | {getDate(a.created)}</span>
                        {a.tags.map(t => <span className="badge badge-secondary pointer font-weight-light p-1 mr-2"
                                               key={t.id}>{t.label}</span>)}
                    </li>
                </ul>
                <div className="card-body">
                    <WysiwygDisplay content={a.content}/>
                </div>
            </div>
        );
    }
}
