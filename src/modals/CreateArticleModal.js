import CustomEditor from "components/CustomEditor";
import SubmitButton from "components/SubmitButton";
import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";

export default class CreateArticleModal extends React.Component {

    state = {
        status: "",
        title: "",
        content: ""
    };

    constructor(props) {
        super(props);
        this.create = this.create.bind(this);
    }

    create() {
        if (!this.state.title || !this.state.content) return null;

        this.setState({status: "loading"});

        let article = {
            title: this.state.title,
            content: this.state.content
        };

        api("POST", "/article", {article: article}, ({status, data}) => {
            if (status === 201) {
                this.props.onCreate(data);
                this.props.onClose();
            }
        });
    }

    render() {

        return (
            <ModalLayout title="Rédiger un nouvel article" onClose={this.props.onClose}>
                <input type="text" className="form-control mb-3" placeholder="Titre de l'article"
                       value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>
                <CustomEditor
                    content={this.state.content} placeholder="Contenu de l'article"
                    onChange={data => this.setState({content: data})}
                />
                <SubmitButton text={"Enregistrer"} status={this.state.status} onClick={this.create}/>
            </ModalLayout>
        );
    }
}