import $ from "jquery";
import React from "react";
import {apiUrl} from "../config";
import ModalLayout from "../layouts/ModalLayout";

export default class TopicForm extends React.Component {

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

        let data = {
            title: this.state.title,
            message: this.state.message
        };
        if(category) data.category = category.id;
        if(event) data.event = event.id;

        $.ajax({
            url: apiUrl + "/topic",
            method: "POST",
            data: data,
            success: res => {
                this.setState({
                    title: "",
                    message: ""
                });
                this.props.onSend();
                this.props.onClose();
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