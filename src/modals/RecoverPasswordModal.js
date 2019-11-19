import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";

export default class RecoverPasswordModal extends React.Component {

    state = {
        message: null,
        type: null,
        email: ""
    };

    constructor(props) {
        super(props);
        this.recoverPassword = this.recoverPassword.bind(this);
    }

    recoverPassword() {
        if (!this.state.email) return null;
        api("POST", "/recover", {email: this.state.email}, ({status, data}) => {
            this.setState({
                message: status === 200 ? "Un nouveau mot de passe a été envoyé par email (vérifier le dossier spam!)" :
                    "Cette adresse email n'est pas liée à un compte utilisateur.",
                type: status === 200 ? "success" : "danger"
            });
        });
    }

    render() {
        return (
            <ModalLayout title="Récupérer le mot de passe" onClose={this.props.onClose}>
                <input type="text" placeholder="Adresse email" className="form-control my-1"
                       value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                <button type="button" className="btn btn-info w-100 my-1" onClick={this.recoverPassword}>
                    M'envoyer un nouveau mot de passe
                </button>
                {this.state.message &&
                <div className={"mt-2 alert alert-" + this.state.type}>
                    {this.state.message}
                </div>}
            </ModalLayout>
        );
    }
}