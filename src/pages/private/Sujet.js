import React from 'react';
import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CF from "../../CustomFunctions";
import Config from "../../Config";
import PrivateLayout from "../../layouts/PrivateLayout";
import ModalLayout from "../../layouts/ModalLayout";
import TableLayout from "../../layouts/TableLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import Avatar from "../../components/Avatar";
import Loader from "../../components/Loader";
import PinnedBadge from "../../components/PinnedBadge";

export default class Sujet extends React.Component {

    state = {
        topic: null,
        modal: false,
        message: "",
        loading: false
    };

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.togglePinned = this.togglePinned.bind(this);
    }

    componentDidMount() {
        this.getTopic();
    }

    getTopic() {
        $.ajax({
            url: Config.apiUrl + "/topic/" + this.props.match.params.topic,
            method: "GET",
            success: res => {
                this.setState({topic: res});
            }
        });
    }

    send() {
        if (!this.state.message) return null;

        this.setState({loading: true});

        let data = {
            topic: this.state.topic.id,
            content: this.state.message
        };

        $.ajax({
            url: Config.apiUrl + "/message",
            method: "POST",
            data: data,
            success: res => {
                this.getTopic();
                this.setState({loading: false, message: ""});
            }
        });
    }

    togglePinned() {
        let topic = this.state.topic;
        topic.pinned = !topic.pinned;
        this.setState({topic: topic});

        $.ajax({
            url: Config.apiUrl + "/topic/" + this.state.topic.id,
            method: "PATCH",
            data: {
                pinned: this.state.topic.pinned
            }
        });
    }

    render() {
        if (!this.state.topic) return <Loader/>;
        let topic = this.state.topic;
        let levels = [
            {label: "Forum", url: "/intranet/forum"},
            {label: topic.category.label, url: "/intranet/forum/" + topic.category.id},
            {label: topic.title}
        ];

        return (
            <PrivateLayout>
                <Breadcrumbs levels={levels}/>
                <div className="container py-4" id="Sujet">
                    <div className="d-flex justify-content-start align-items-top mb-2">
                        <span onClick={this.togglePinned} className="mr-3 display-3 pointer">
                            <PinnedBadge pinned={topic.pinned}/>
                        </span>
                        <h3>{topic.title}</h3>
                    </div>
                    {LinkToBottom}
                    {this.renderMessages()}
                    {this.renderForm()}
                    {LinkToTop}
                </div>
                {this.state.modal && this.renderModal()}
            </PrivateLayout>
        );
    }

    renderMessages() {
        return (
            <TableLayout>
                {this.state.topic.messages.map(m =>
                    <tr key={m.id}>
                        <td><Avatar/></td>
                        <td>
                            <div className="d-flex mb-2">
                                <span className="text-muted small-caps">{CF.getName(m.author, true)}</span>
                                <span className="text-muted ml-auto">{CF.fromNow(m.created)}</span> <br/>
                            </div>
                            <span>{m.content}</span>
                        </td>
                    </tr>
                )}
            </TableLayout>
        );
    }

    renderForm() {
        return (
            <div className="input-group mt-2">
                <textarea className="form-control" placeholder="Ma réponse..." value={this.state.message}
                          onChange={e => this.setState({message: e.target.value})}/>
                <div className="input-group-append">
                    <button className="btn btn-info ml-auto w-100" onClick={this.send}>
                        {this.state.loading ?
                            <FontAwesomeIcon icon="axe" className="fa-spin mr-2"/> :
                            <FontAwesomeIcon icon="paper-plane" className="mr-2"/>}
                        <span className="d-none d-sm-inline">Envoyer</span>
                    </button>
                </div>
            </div>
        );
    }

    renderModal() {
        return (
            <ModalLayout title="Répondre" onClose={() => this.setState({modal: false})}>
                <textarea className="form-control my-2" placeholder="Message"/>
                <button type="button" className="btn btn-info w-100">Poster</button>
            </ModalLayout>
        );
    }
}

const LinkToBottom = (
    <a className="btn btn-outline-info w-100 my-2" id="PageTop" href="#PageBottom">
        <div className="d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={["fal", "angle-double-down"]}/>
            <span className="small-caps mx-2">Aller au bas de la page</span>
            <FontAwesomeIcon icon={["fal", "angle-double-down"]}/>
        </div>
    </a>
);

const LinkToTop = (
    <a className="btn btn-outline-info w-100 my-2" id="PageBottom" href="#PageTop">
        <FontAwesomeIcon icon={["fal", "angle-double-up"]}/>
        <span className="small-caps mx-2">Remonter en haut de la page</span>
        <FontAwesomeIcon icon={["fal", "angle-double-up"]}/>
    </a>
);
