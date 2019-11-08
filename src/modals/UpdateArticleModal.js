import CustomEditor from "components/CustomEditor";
import SubmitButton from "components/SubmitButton";
import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";

export default class UpdateArticleModal extends React.Component {

    state = {
        status: "",
        title: this.props.article.title,
        content: this.props.article.content,
        tags: this.props.article.tags.map(t => t.id),
        allTags: []
    };

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        api("GET", "/tag", {}, ({status, data}) => {
            if (data) this.setState({allTags: data});
        });
    }

    update() {
        if (!this.state.title || !this.state.content) return null;

        this.setState({status: "loading"});

        let article = {
            title: this.state.title,
            content: this.state.content,
            tags: this.state.tags
        };

        api("PUT", "/article/" + this.props.article.id, {article: article}, ({status, data}) => {
            if (status === 200) {
                this.props.onUpdate(data);
                this.props.onClose();
            }
        });
    }

    toggleTag(id, checked) {
        let tags = this.state.tags.filter(t => t !== id);
        if(checked) tags.push(id);
        this.setState({tags: tags});
    }

    render() {
        return (
            <ModalLayout title="Modifier l'article" onClose={this.props.onClose}>
                <input type="text" className="form-control mb-2" placeholder="Titre de l'article"
                       value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>
                <div className="mb-2 form-inline">
                    {this.state.allTags.map(t => {
                        let isChecked = this.state.tags.includes(t.id);
                        return (
                            <div className="custom-control custom-checkbox mr-2">
                                <input type="checkbox" className="custom-control-input"
                                       id={t.id} checked={isChecked}
                                       onChange={e => this.toggleTag(t.id, e.target.checked)}/>
                                <label className="custom-control-label" htmlFor={t.id}>
                                    {t.label}
                                </label>
                            </div>
                        );
                    })}
                </div>
                <div className="border border-light rounded mb-2">
                    <CustomEditor
                        content={this.state.content} placeholder="Contenu de l'article"
                        onChange={data => this.setState({content: data})}
                    />
                </div>
                <SubmitButton text={"Enregistrer"} status={this.state.status} onClick={this.update}/>
            </ModalLayout>
        );
    }
}