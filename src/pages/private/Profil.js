import React from 'react';
import PrivateLayout from "../../layouts/PrivateLayout";
import Config from "../../Config";
import $ from "jquery";

// TODO: Modifier l'image de profil

export default class Profil extends React.Component {

    messages = {
        pwsDontMatch: "Les mots de passe indiqués ne correspondent pas.",
        emptyField: "Le nom, le prénom et l'adresse email sont obligatoires.",
        success: "Les informations ont bien été modifiées!"
    };

    state = {
        user: null,
        allUsers: [],
        password1: "",
        password2: "",
        alert: null,
        alertType: "danger",
        filename: "Choisis une image..."
    };

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        this.getUser();
        this.getAllUsers();
    }

    getUser() {
        $.ajax({
            url: Config.apiUrl + "/users/profile",
            method: "GET",
            success: res => {
                res.mentor = res.mentor ? res.mentor.id : 0;
                res.newbie = res.newbie ? res.newbie.id : 0;
                this.setState({user: res});
            }
        });
    }

    getAllUsers() {
        $.ajax({
            url: Config.apiUrl + "/users",
            method: "GET",
            success: res => {
                res = res.sort((a, b) => a.firstName - b.firstName);
                this.setState({allUsers: res});
            }
        });
    }

    changeImage(e) {
        let files = e.target.files;
        if (!files.length) return null;
        let file = files[0];
        this.setState({filename: file.name});

        let formData = new FormData();
        formData.append("file", file);
        formData.append("name", "my-super-name-2.jpg");
        $.ajax({
            url: Config.apiUrl + "/files",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: res => {
                console.log(res);
            }
        });
    }

    updateField(field, value) {
        let user = this.state.user;
        user[field] = value;
        this.setState({user: user});
    }

    checkErrors() {
        if (this.state.password1 || this.state.password2) {
            if (this.state.password1 !== this.state.password2) {
                this.setState({alert: this.messages.pwsDontMatch, alertType: "danger"});
                return false;
            }
        }

        let u = this.state.user;
        if (!u.firstName || !u.lastName || !u.email) {
            this.setState({alert: this.messages.emptyField, alertType: "danger"});
            return false;
        }

        return true;
    }

    send() {
        if (!this.checkErrors()) return null;
        let data = this.state.user;
        if (this.state.password1) data.password = this.state.password1;

        $.ajax({
            url: Config.apiUrl + "/users/profile",
            method: "PATCH",
            data: data,
            success: res => {
                this.setState({
                    alert: this.messages.success,
                    alertType: "success",
                });
            }
        });
    }

    render() {
        let u = this.state.user;
        if (!u) return <h1>Loading...</h1>;
        return (
            <PrivateLayout>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-md-7">
                            {this.renderBasics(u)}
                            {this.renderMember(u)}
                            {this.renderPassword(u)}
                            {this.renderFormElements()}
                        </div>
                        <div className="col-12 col-md-5">
                            {this.renderAvatar(u)}
                        </div>
                    </div>
                </div>
            </PrivateLayout>
        );
    }

    renderBasics(u) {
        return (
            <div className="row">
                <div className="col-12">
                    <h2>Informations de base</h2>
                </div>
                <div className="col-6 mb-2">
                    <input type="text" className="form-control" placeholder="Prénom" value={u.firstName}
                           onChange={e => this.updateField("firstName", e.target.value)}/>
                </div>
                <div className="col-6 mb-2">
                    <input type="text" className="form-control" placeholder="Nom" value={u.lastName}
                           onChange={e => this.updateField("lastName", e.target.value)}/>
                </div>
                <div className="col-6 mb-2">
                    <input type="text" className="form-control" placeholder="Email" value={u.email}
                           onChange={e => this.updateField("email", e.target.value)}/>
                </div>
                <div className="col-6 mb-2">
                    <input type="text" className="form-control" placeholder="N° téléphone" value={u.phone}
                           onChange={e => this.updateField("phone", e.target.value)}/>
                </div>
                <div className="col-12 mb-2">
                    <input type="text" className="form-control" placeholder="Adresse" value={u.address}
                           onChange={e => this.updateField("address", e.target.value)}/>
                </div>
                <div className="col-5 mb-2">
                    <input type="text" className="form-control" placeholder="NPA" value={u.npa}
                           onChange={e => this.updateField("npa", e.target.value)}/>
                </div>
                <div className="col-7 mb-2">
                    <input type="text" className="form-control" placeholder="Localité" value={u.city}
                           onChange={e => this.updateField("city", e.target.value)}/>
                </div>
            </div>
        );
    }

    renderMember(u) {
        return (
            <div className="row my-2">
                <div className="col-12 mb-2">
                    <h2>Membre Viviskes</h2>
                </div>
                <div className="col-12 mb-2 text-justify">
                    <input type="checkbox" className="mr-2" checked={u.isActive}
                           onChange={e => this.updateField("isActive", e.target.checked)}/>
                    <span>Je suis membre actif de Viviskes. Je m'engage à participer régulièrement aux activités
                        et aux entraînements, et à avertir suffisamment à l'avance le responsable des entraînements en
                        cas d'absence. Je m'engage à me tenir au courant de ce qui se passe dans l'association et à
                        présenter un costume historiquement correct lors des ses activités.</span>
                </div>
                <div className="col-12 mb-2">
                    <input type="text" className="form-control" placeholder="Nom celte" value={u.celticName}
                           onChange={e => this.updateField("celticName", e.target.value)}/>
                </div>
                <div className="col-12 mb-2">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label className="input-group-text">Je suis parrainé par</label>
                        </div>
                        <select className="custom-select" value={u.mentor}
                                onChange={e => this.updateField("mentor", e.target.value)}>
                            <option value="0">-</option>
                            {this.state.allUsers.map(user =>
                                <option value={user.id} key={user.id}>{user.firstName + " " + user.lastName}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label className="input-group-text">Je parraine</label>
                        </div>
                        <select className="custom-select" value={u.newbie}
                                onChange={e => this.updateField("newbie", e.target.value)}>
                            <option value="0">-</option>
                            {this.state.allUsers.map(user =>
                                <option value={user.id} key={user.id}>{user.firstName + " " + user.lastName}</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    renderPassword() {
        return (
            <div className="row">
                <div className="col-12">
                    <h2>Modifier le mot de passe</h2>
                </div>
                <div className="col-12 col-sm-6 mb-2">
                    <input type="password" className="form-control" placeholder="Nouveau mot de passe"
                           value={this.state.password1} onChange={e => this.setState({password1: e.target.value})}/>
                </div>
                <div className="col-12 col-sm-6 mb-2">
                    <input type="password" className="form-control" placeholder="Répéter le mot de passe"
                           value={this.state.password2} onChange={e => this.setState({password2: e.target.value})}/>
                </div>
            </div>
        );
    }

    renderFormElements() {
        return (
            <div className="row">
                {this.state.alert &&
                <div className="col-12">
                    <div className={"alert alert-" + this.state.alertType}>
                        {this.state.alert}
                    </div>
                </div>
                }
                <div className="col-12">
                    <button className="btn btn-info w-100" onClick={this.send}>
                        Enregistrer les modifications
                    </button>
                </div>
            </div>
        );
    }

    renderAvatar() {
        return (
            <div className="row">
                <div className="col-12">
                    <h2>Image de profil</h2>
                    <div className="alert alert-warning">
                        Attention! Cette image apparaît sur la page publique des membres.
                        Choisis une photo présentable en costume, pas trop pixellisée et si possible carrée.
                    </div>
                    <form method="POST" action={Config.apiUrl + "/files"}>
                        <div className="custom-file mb-2">
                            <input type="file" className="custom-file-input" id="customFile"
                                   onChange={e => this.changeImage(e)}/>
                            <label className="custom-file-label" htmlFor="customFile">{this.state.filename}</label>
                        </div>
                        <button type="submit" className="btn btn-dark w-100 mb-2">Send</button>
                    </form>
                    <img src="/images/membres/1.jpg" alt="Avatar" className="img-fluid rounded"/>
                </div>
            </div>
        );
    }
}
