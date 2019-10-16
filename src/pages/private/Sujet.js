import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import Avatar from "components/Avatar";
import Breadcrumbs from "components/Breadcrumbs";
import Loader from "components/Loader";
import PinnedBadge from "components/PinnedBadge";
import PrivateLayout from "layouts/PrivateLayout";
import TableLayout from "layouts/TableLayout";
import UpdateMessageModal from "modals/UpdateMessageModal";
import UpdateTopicModal from "modals/UpdateTopicModal";
import React from "react";
import {api, fromNow, getName} from "utils";

export default class Sujet extends React.Component {

    state = {
        topic: null,
        modal: null,
        message: null,
        textBox: "",
        loading: false,
        user: JSON.parse(localStorage.user)
    };

    constructor(props) {
        super(props);
        this.getTopic = this.getTopic.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.togglePinned = this.togglePinned.bind(this);
    }

    componentDidMount() {
        this.getTopic();
    }

    getTopic() {
        api("GET", "/topic/" + this.props.match.params.topic, {}, ({status, data}) => {
            if (data) this.setState({topic: data});
        });
    }

    createMessage() {
        if (!this.state.textBox) return null;

        this.setState({loading: true});

        let message = {
            topic: this.state.topic.id,
            content: this.state.textBox
        };

        api("POST", "/message", {message: message}, ({status, data}) => {
            if (status === 201) {
                this.getTopic();
                this.setState({loading: false, textBox: ""});
            }
        });
    }

    togglePinned() {
        let topic = this.state.topic;
        topic.pinned = !topic.pinned;
        this.setState({topic: topic});

        let data = {pinned: this.state.topic.pinned};
        api("PUT", "/topic/" + this.state.topic.id, {topic: data}, ({status, data}) => {
        });
    }

    render() {
        if (!this.state.topic) return <Loader/>;
        let topic = this.state.topic;
        let levels = [];
        if (topic.category) {
            levels = [
                {label: "Forum", url: "/intranet/forum"},
                {label: topic.category.label, url: "/intranet/forum/" + topic.category.id},
                {label: topic.title}
            ];
        } else {
            levels = [
                {label: "Calendrier", url: "/intranet/calendrier"},
                {label: topic.event.title, url: "/intranet/calendrier/" + topic.event.id},
                {label: topic.title}
            ];
        }

        return (
            <PrivateLayout>
                <Breadcrumbs levels={levels}/>
                <div className="container py-4" id="Sujet">
                    <div className="d-flex justify-content-start align-items-center mb-2">
                        <span onClick={this.togglePinned} className="display-3 pointer">
                            <PinnedBadge pinned={topic.pinned}/>
                        </span>
                        <h3 className="my-0 mx-2">{topic.title}</h3>
                        <span onClick={() => this.setState({modal: "updateTopic"})} className="pointer">
                            <FAI icon={"pencil"} className={"text-info"}/>
                        </span>
                    </div>
                    {LinkToBottom}
                    {this.renderMessages()}
                    {this.renderForm()}
                    {LinkToTop}
                </div>
                {this.state.modal === "updateTopic" && <UpdateTopicModal
                    topic={this.state.topic}
                    onClose={() => this.setState({modal: null})}
                    onUpdate={updatedTopic => this.setState({topic: updatedTopic})}/>}
                {this.state.modal === "updateMessage" && <UpdateMessageModal
                    message={this.state.message}
                    onClose={() => this.setState({modal: null})}
                    onUpdate={this.getTopic}/>}
            </PrivateLayout>
        );
    }

    renderMessages() {
        return (
            <TableLayout>
                {this.state.topic.messages.map(m =>
                    <tr key={m.id}>
                        <td className="d-none d-sm-table-cell" valign="top">
                            <Avatar user={m.author}/>
                        </td>
                        <td>
                            <div className="d-flex mb-2">
                                <span className="text-muted small-caps">{getName(m.author, true)}</span>
                                <span className="ml-auto">
                                    {this.state.user.id === m.author.id &&
                                    <span className="pointer text-info mr-2" title="Modifier le message"
                                          onClick={() => this.setState({message: m, modal: "updateMessage"})}>
                                        <FAI icon="pencil"/>
                                    </span>
                                    }
                                    {m.created !== m.edited &&
                                    <span className="text-secondary mr-2" title="Ce message a été modifié">
                                        <FAI icon="pencil"/>
                                    </span>
                                    }
                                    <span className="text-muted">
                                        {fromNow(m.created)}
                                    </span>
                                </span>
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
                <textarea className="form-control" placeholder="Ma réponse..." value={this.state.textBox}
                          onChange={e => this.setState({textBox: e.target.value})}/>
                <div className="input-group-append">
                    <button className="btn btn-info ml-auto w-100" onClick={this.createMessage}>
                        {this.state.loading ?
                            <FAI icon="axe" className="fa-spin mr-2"/> :
                            <FAI icon="paper-plane" className="mr-2"/>}
                        <span className="d-none d-sm-inline">Envoyer</span>
                    </button>
                </div>
            </div>
        );
    }
}

const LinkToBottom = (
    <a className="btn btn-outline-info w-100 my-2" id="PageTop" href="#PageBottom">
        <div className="d-flex align-items-center justify-content-center">
            <FAI icon={["fal", "angle-double-down"]}/>
            <span className="small-caps mx-2">Aller au bas de la page</span>
            <FAI icon={["fal", "angle-double-down"]}/>
        </div>
    </a>
);

const LinkToTop = (
    <a className="btn btn-outline-info w-100 my-2" id="PageBottom" href="#PageTop">
        <FAI icon={["fal", "angle-double-up"]}/>
        <span className="small-caps mx-2">Remonter en haut de la page</span>
        <FAI icon={["fal", "angle-double-up"]}/>
    </a>
);
