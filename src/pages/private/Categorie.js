import React from 'react';
import Config from "../../Config";
import $ from "jquery";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PrivateLayout from "../../layouts/PrivateLayout";
import ModalLayout from "../../layouts/ModalLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import UnreadBadge from "../../components/UnreadBadge";
import Loader from "../../components/Loader";
import CF from "../../CustomFunctions";

export default class Categorie extends React.Component {

    state = {
        modal: false,
        category: null,
        title: "",
        message: ""
    };

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
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
                this.setState({category: res});
            }
        });
    }

    send() {
        if (!this.state.title || !this.state.message) return null;
        let data = {
            category: this.state.category.id,
            title: this.state.title,
            message: this.state.message
        };

        $.ajax({
            url: Config.apiUrl + "/topic",
            method: "POST",
            data: data,
            success: res => {
                this.getCategory();
                this.setState({
                    modal: false,
                    title: "",
                    message: ""
                });
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
                {this.state.modal && this.renderModal()}
            </PrivateLayout>
        );
    }

    renderTopic(t) {
        return (
            <Link className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
                  to={"/intranet/forum/" + t.category.id + "/" + t.id} key={t.id}>
                <div className="pr-3"><UnreadBadge read={t.read}/></div>
                <div>
                    <span className="d-block small-caps">{t.title}</span>
                    <span className="d-block">
                        {CF.getName(t.lastMessage.author, true) + " a posté " + CF.fromNow(t.lastMessage.created)}
                    </span>
                </div>
            </Link>
        );
    }

    renderModal() {
        return (
            <ModalLayout title="Créer un sujet"
                         onClose={() => this.setState({modal: false, title: "", message: ""})}>
                <input type="text" className="form-control my-2" placeholder="Titre du sujet"
                       value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>
                <textarea className="form-control my-2" placeholder="Premier message"
                          value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>
                <button type="button" className="btn btn-info w-100" onClick={this.send}>Poster</button>
            </ModalLayout>
        );
    }
}
