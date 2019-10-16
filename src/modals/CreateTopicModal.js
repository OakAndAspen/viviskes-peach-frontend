import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";

export default class CreateTopicModal extends React.Component {

    state = {
        title: "",
        message: ""
    };

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
    }

    send() {
        let category = this.props.category;
        let event = this.props.event;
        if (!this.state.title || !this.state.message || (!category && !event)) return null;

        let topic = {
            title: this.state.title,
            pinned: false
        };
        if(category) topic.category = category.id;
        if(event) topic.event = event.id;

        api("POST", "/topic", {topic:topic}, ({status, data}) => {
            if (status === 201) {
                let message = {
                    topic: data.id,
                    content: this.state.message
                };

                api("POST", "/message", {message:message}, ({status, data}) => {
                    if (status === 201) {
                        this.props.onSend();
                        this.props.onClose();
                    }
                });
            }
        });
    }

    render() {
        return (
            <ModalLayout title="Créer un sujet" onClose={this.props.onClose}>
                <input type="text" className="form-control my-2" placeholder="Titre du sujet"
                       value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>
                <textarea className="form-control my-2" placeholder="Premier message"
                          value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>
                <button type="button" className="btn btn-info w-100" onClick={this.send}>Poster</button>
            </ModalLayout>
        );
    }
}