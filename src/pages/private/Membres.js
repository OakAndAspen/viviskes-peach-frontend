import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import {apiUrl} from "config";
import ModalLayout from "layouts/ModalLayout";
import PrivateLayout from "layouts/PrivateLayout";
import React from "react";
import {api} from "utils";

export default class Membres extends React.Component {

    messages = {
        emptyField: "Tous les champs sont obligatoires.",
        pwsDontMatch: "Les mots de passe ne correspondent pas.",
        success: "Le nouveau membre a été enregistré!"
    };

    state = {
        allUsers: [],
        search: "",
        detailsModal: false,
        createModal: false,
        user: null,
        alert: null,
        alertType: "danger",
        form: {
            firstName: "",
            lastName: "",
            email: "",
            password1: "",
            password2: ""
        }
    };

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        api("GET", "/user", {}, ({status, data}) => {
            if (data) {
                data.sort((a, b) => a.firstName.localeCompare(b.firstName));
                this.setState({allUsers: data});
            }
        });
    }

    showDetails(id) {
        this.setState({detailsModal: true});
        api("GET", "/user/" + id, {}, ({status, data}) => {
            if (data) this.setState({user: data});
        });
    }

    filterUsers() {
        let search = this.state.search.toLowerCase();
        let filtered = this.state.allUsers.filter(u => {
            if (u.firstName.toLowerCase().includes(search) || u.lastName.toLowerCase().includes(search)) {
                return true;
            }
            if (u.celticName && u.celticName.toLowerCase().includes(search)) return true;
            return false;
        });
        return filtered;
    }

    getFullName(u) {
        let fullName = u.firstName + " " + u.lastName;
        if (u.celticName) fullName += " (" + u.celticName + ")";
        return fullName;
    }

    updateField(field, value) {
        let form = this.state.form;
        form[field] = value;
        this.setState({form: form});
    }

    checkErrors() {
        let f = this.state.form;

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
        let data = this.state.form;
        data.password = this.state.password1;

        api("POST", "/user", data, ({status, data}) => {
            if (status === 201) {
                this.setState({alert: this.messages.success, alertType: "success"});
                this.getAllUsers();
            }
        });
    }

    render() {
        return (
            <PrivateLayout>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-md-8 col-lg-6 mx-auto">
                            {this.renderSearchAndNew()}
                            {this.renderList()}
                        </div>
                    </div>
                </div>
                {this.renderDetailsModal()}
                {this.renderCreateModal()}
            </PrivateLayout>
        );
    }

    renderSearchAndNew() {
        return (
            <div className="row">
                <div className="col-12 col-sm-6">
                    <input type="text" placeholder="Cherche un membre..." className="form-control my-2"
                           value={this.state.search} onChange={e => this.setState({search: e.target.value})}/>
                </div>
                <div className="col-12 col-sm-6">
                    <button type="button" className="btn btn-info w-100 my-2"
                            onClick={() => this.setState({createModal: true})}>
                        <FAI icon={"plus"} className="mr-2"/>
                        <span>Nouveau membre</span>
                    </button>
                </div>
            </div>
        );
    }

    renderList() {
        return (
            <ul className="list-group">
                {this.filterUsers().map(u =>
                    <button type="button" className="list-group-item list-group-item-action d-flex" key={u.id}
                            onClick={() => this.showDetails(u.id)}>
                        <span><FAI icon={["fal", "user-circle"]}/></span>
                        <span className="mx-3">{this.getFullName(u)}</span>
                        <span className="ml-auto">
                            {u.isAdmin && <FAI icon={["fal", "user-cog"]} className="mx-1" title={"Admin"}/>}
                            {u.isFighting && <FAI icon={["fal", "swords"]} className="mx-1" title={"Combattant"}/>}
                            {u.isActive && <FAI icon={["fal", "user-check"]} className="mx-1" title={"Membre actif"}/>}
                                </span>
                        <span className="ml-2 text-info" title={"Plus d'informations sur " + u.firstName}>
                            <FAI icon={["fal", "info-square"]}/>
                        </span>
                    </button>
                )}
            </ul>
        );
    }

    renderDetailsModal() {
        if (!this.state.detailsModal) return null;

        if (!this.state.user) return (
            <ModalLayout title="Chargement..." onClose={() => this.setState({detailsModal: false, user: null})}>
                <h1 className="text-center"><FAI icon={["fal", "axe"]} className="fa-spin"/></h1>
            </ModalLayout>
        );

        let u = this.state.user;
        return (
            <ModalLayout title={this.getFullName(u)}
                         onClose={() => this.setState({detailsModal: false, user: null})}>
                <img className="card-img-top mb-2 rounded" src={apiUrl + "/uploads/users/" + u.id + ".jpg"}
                     alt={u.firstName + " n'a pas encore choisi d'avatar."}/>

                <table className="table table-borderless">
                    <tbody>
                    {(u.isActive || u.isFighting || u.isAdmin) &&
                    <tr>
                        <td className="small-caps">Statut</td>
                        <td>
                            {u.isActive && <span>
                                <FAI icon={["fal", "user-check"]} className="mr-2"/>
                                Membre actif
                            </span>}
                            {u.isFighting && <p>
                                <FAI icon={["fal", "swords"]} className="mr-2"/>
                                Combattant
                            </p>}
                            {u.isAdmin && <p>
                                <FAI icon={["fal", "user-cog"]} className="mr-2"/>
                                Administrateur du site
                            </p>}
                        </td>
                    </tr>
                    }
                    {u.address &&
                    <tr>
                        <td className="small-caps">Adresse</td>
                        <td>{u.address} <br/> {u.npa + " " + u.city}</td>
                    </tr>
                    }

                    {u.email && <tr>
                        <td className="small-caps">Email</td>
                        <td>{u.email}</td>
                    </tr>}

                    {u.phone && <tr>
                        <td className="small-caps">Natel</td>
                        <td>{u.phone}</td>
                    </tr>}

                    {u.mentor && <tr>
                        <td className="small-caps">Parrainé(e) par</td>
                        <td>{this.getFullName(u.mentor)}</td>
                    </tr>}

                    {u.newbie && <tr>
                        <td className="small-caps">Parrain/marraine de</td>
                        <td>{this.getFullName(u.newbie)}</td>
                    </tr>}
                    </tbody>
                </table>
            </ModalLayout>
        );
    }

    renderCreateModal() {
        if (!this.state.createModal) return null;
        let f = this.state.form;
        return (
            <ModalLayout title="Nouveau membre"
                         onClose={() => this.setState({createModal: false})}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <input type="text" placeholder="Prénom" className="form-control my-1"
                               value={f.firstName} onChange={e => this.updateField("firstName", e.target.value)}/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <input type="text" placeholder="Nom" className="form-control my-1"
                               value={f.lastName} onChange={e => this.updateField("lastName", e.target.value)}/>
                    </div>
                    <div className="col-12">
                        <input type="text" placeholder="Email" className="form-control my-1"
                               value={f.email} onChange={e => this.updateField("email", e.target.value)}/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <input type="password" placeholder="Mot de passe" className="form-control my-1"
                               value={f.password1} onChange={e => this.updateField("password1", e.target.value)}/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <input type="password" placeholder="Répéter le mot de passe" className="form-control my-1"
                               value={f.password2} onChange={e => this.updateField("password2", e.target.value)}/>
                    </div>
                    {this.state.alert &&
                    <div className="col-12">
                        <div className={"my-1 alert alert-" + this.state.alertType}>{this.state.alert}</div>
                    </div>
                    }
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
