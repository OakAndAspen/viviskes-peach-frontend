import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";
import SubmitButton from "components/SubmitButton";

export default class UpdateTopicModal extends React.Component {

    state = {
        status: "",
        title: this.props.topic.title
    };

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
    }

    send() {
        let topic = {
            title: this.state.title
        };

        this.setState({status: "loading"});

        api("PUT", "/topic/" + this.props.topic.id, {topic: topic}, ({status, data}) => {
            if (status === 200) {
                this.props.onUpdate(data);
                this.props.onClose();
            }
        });
    }

    render() {
        return (
            <ModalLayout title="Modifier le sujet" onClose={this.props.onClose}>
                <input type="text" className="form-control my-2" placeholder="Titre du sujet"
                       value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>
                <SubmitButton text={"Enregistrer"} status={this.state.status} onClick={this.send}/>
            </ModalLayout>
        );
    }
}