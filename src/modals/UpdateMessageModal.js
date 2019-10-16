import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import CKEditor from "@ckeditor/ckeditor5-react";
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
                <CKEditor
                    style={{backgroundColor:"white"}}
                    editor={InlineEditor}
                    data={this.state.content}
                    config={{
                        placeholder: "Message"
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        this.setState({content: data});
                    }}
                />
                <SubmitButton text={"Enregistrer"} status={this.state.status} onClick={this.send}/>
            </ModalLayout>
        );
    }
}