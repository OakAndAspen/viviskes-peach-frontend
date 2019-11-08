import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";

export default class CreateUserModal extends React.Component {

    messages = {
        emptyField: "Tous les champs sont obligatoires.",
        pwsDontMatch: "Les mots de passe ne correspondent pas.",
        success: "Le nouveau membre a été enregistré!"
    };

    state = {
        alert: null,
        alertType: "danger",
        firstName: "",
        lastName: "",
        email: "",
        password1: "",
        password2: ""
    };

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
    }

    checkErrors() {
        let f = this.state;

        if (!f.firstName || !f.lastName || !f.email || !f.password1 || !f.password2) {
            this.setState({alert: this.messages.emptyField, alertType: "danger"});
            return false;
        }

        if (f.password1 !== f.password2) {
            this.setState({alert: this.messages.pwsDontMatch, alertType: "danger"});
            return false;
        }
        return true;
    }

    send() {
        if (!this.checkErrors()) return null;
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password1
        };

        api("POST", "/user", {user: user}, ({status, data}) => {
            if (status === 201) {
                this.props.onCreate();
                this.props.onClose();
            }
        });
    }

    render() {
        let f = this.state;
        return (
            <ModalLayout title="Nouveau membre" onClose={this.props.onClose}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <input type="text" placeholder="Prénom" className="form-control my-1"
                               value={f.firstName} onChange={e => this.setState({firstName: e.target.value})}/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <input type="text" placeholder="Nom" className="form-control my-1"
                               value={f.lastName} onChange={e => this.setState({lastName: e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <input type="text" placeholder="Email" className="form-control my-1"
                               value={f.email} onChange={e => this.setState({email: e.target.value})}/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <input type="password" placeholder="Mot de passe" className="form-control my-1"
                               value={f.password1} onChange={e => this.setState({password1: e.target.value})}/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <input type="password" placeholder="Répéter le mot de passe" className="form-control my-1"
                               value={f.password2} onChange={e => this.setState({password2: e.target.value})}/>
                    </div>
                    {this.state.alert &&
                    <div className="col-12">
                        <div className={"my-1 alert alert-" + this.state.alertType}>{this.state.alert}</div>
                    </div>}
                    <div className="col-12">
                        <button type="button" className="btn btn-info w-100 my-1" onClick={this.send}>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </ModalLayout>
        );
    }
}