import $ from "jquery";
import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";

export default class RenameMediaModal extends React.Component {

    state = {
        media: this.props.media,
        type: this.props.type
    };

    constructor(props) {
        super(props);
        this.rename = this.rename.bind(this);
    }

    rename() {
        let newName = $("#NewName").val();
        if (!newName) return null;
        let form = {name: newName};

        let url = "/" + this.state.type + "/" + this.state.media.id;
        api("PUT", url, {[this.state.type]: form}, ({status, data}) => {
            if (data) {
                this.props.onRename();
                this.props.onClose();
            }
        });
    }

    render() {
        return (
            <ModalLayout onClose={() => this.setState({renameModal: false})}
                         title={"Renommer le " + (this.state.type === "folder" ? "dossier" : "document")}>
                <input type="text" className="form-control my-2" placeholder="Nouveau nom" id="NewName"
                       defaultValue={this.state.media.name}/>
                <button className="btn btn-info w-100" onClick={this.rename}>Renommer</button>
            </ModalLayout>
        );
    }
}