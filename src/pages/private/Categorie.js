import React from 'react';
import $ from "jquery";
import Config from "../../Config";
import CF from "../../CustomFunctions";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PrivateLayout from "../../layouts/PrivateLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import UnreadBadge from "../../components/UnreadBadge";
import Loader from "../../components/Loader";
import PinnedBadge from "../../components/PinnedBadge";
import TopicForm from "../../components/TopicForm";

export default class Categorie extends React.Component {

    state = {
        modal: false,
        category: null
    };

    constructor(props) {
        super(props);
        this.getCategory = this.getCategory.bind(this);
    }

    componentDidMount() {
        this.getCategory();
    }

    getCategory() {
        $.ajax({
            url: Config.apiUrl + "/category/" + this.props.match.params.category,
            method: "GET",
            success: res => {
                res.topics = res.topics.sort((a, b) => b.lastMessage.created.localeCompare(a.lastMessage.created));
                res.topics = res.topics.sort((a, b) => b.pinned - a.pinned);
                this.setState({category: res});
            }
        });
    }

    render() {
        if (!this.state.category) return <Loader/>;

        let levels = [
            {label: "Forum", url: "/intranet/forum"},
            {label: this.state.category.label}
        ];

        return (
            <PrivateLayout>
                <Breadcrumbs levels={levels}/>
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
                {this.state.modal &&
                <TopicForm onSend={this.getCategory} category={this.state.category}
                           onClose={() => this.setState({modal: false})}/>
                }
            </PrivateLayout>
        );
    }

    renderTopic(t) {
        return (
            <Link className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
                  to={"/intranet/forum/topic/" + t.id} key={t.id}>
                <div className="pr-3"><UnreadBadge read={t.read}/></div>
                <div className="pr-3"><PinnedBadge pinned={t.pinned}/></div>
                <div>
                    <span className="d-block small-caps">{t.title}</span>
                    <span className="d-block">
                        {CF.getName(t.lastMessage.author, true) + " a posté " + CF.fromNow(t.lastMessage.created)}
                    </span>
                </div>
            </Link>
        );
    }
}
