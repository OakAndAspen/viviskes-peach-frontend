import SubmitButton from "components/SubmitButton";
import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";

export default class UpdateMessageModal extends React.Component {

    state = {
        status: "",
        content: this.props.message.content
    };

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
    }

    send() {
        let message = {
            content: this.state.content
        };

        this.setState({status: "loading"});

        api("PUT", "/message/" + this.props.message.id, {message: message}, ({status, data}) => {
            if (status === 200) {
                this.props.onUpdate(data);
                this.props.onClose();
            }
        });
    }

    render() {
        return (
            <ModalLayout title="Modifier le message" onClose={this.props.onClose}>
                <input type="text" className="form-control my-2" placeholder="Message"
                       value={this.state.content} onChange={e => this.setState({content: e.target.value})}/>
                <SubmitButton text={"Enregistrer"} status={this.state.status} onClick={this.send}/>
            </ModalLayout>
        );
    }
}