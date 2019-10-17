import WysiwygDisplay from "components/WysiwygDisplay";
import ModalLayout from "layouts/ModalLayout";
import React from "react";

export default class ShowArticleModal extends React.Component {

    render() {
        return (
            <ModalLayout title="Lire l'article" onClose={this.props.onClose}>
                <h1>{this.props.article.title}</h1>
                <WysiwygDisplay content={this.props.article.content}/>
            </ModalLayout>
        );
    }
}