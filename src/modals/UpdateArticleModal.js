import CustomEditor from "components/CustomEditor";
import SubmitButton from "components/SubmitButton";
import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";

export default class UpsertArticleModal extends React.Component {

    state = {
        status: "",
        title: this.props.article.title,
        content: this.props.article.content
    };

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }

    update() {
        if (!this.state.title || !this.state.content) return null;

        this.setState({status: "loading"});

        let article = {
            title: this.state.title,
            content: this.state.content
        };

        api("PUT", "/article/" + this.props.article.id, {article: article}, ({status, data}) => {
            if (status === 200) {
                this.props.onUpdate(data);
                this.props.onClose();
            }
        });
    }

    render() {

        return (
            <ModalLayout title="Modifier l'article" onClose={this.props.onClose}>
                <input type="text" className="form-control mb-3" placeholder="Titre de l'article"
                       value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>
                <CustomEditor
                    content={this.state.content} placeholder="Contenu de l'article"
                    onChange={data => this.setState({content: data})}
                />
                <SubmitButton text={"Enregistrer"} status={this.state.status} onClick={this.update}/>
            </ModalLayout>
        );
    }
}