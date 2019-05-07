import React from 'react';
import PrivateLayout from "../../components/PrivateLayout";
import $ from "jquery";
import Config from "../../Config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalLayout from "../../components/ModalLayout";

export default class Membres extends React.Component {

    state = {
        allUsers: [],
        search: "",
        modal: false,
        user: null
    };

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        $.ajax({
            url: Config.apiUrl + "/users",
            method: "GET",
            success: res => {
                res.sort((a, b) => a.firstName - b.firstName);
                this.setState({allUsers: res});
            }
        });
    }

    showDetails(id) {
        this.setState({modal: true});
        $.ajax({
            url: Config.apiUrl + "/users/" + id,
            method: "GET",
            success: res => {
                this.setState({user: res});
            }
        });
    }

    filterUsers() {
        let search = this.state.search.toLowerCase();
        let filtered = this.state.allUsers.filter(u => {
            if (u.firstName.toLowerCase().includes(search) || u.lastName.toLowerCase().includes(search) ||
                u.celticName.toLowerCase().includes(search)) {
                return true;
            }
            return false;
        });
        return filtered;
    }

    getFullName(u) {
        let fullName = u.firstName + " " + u.lastName;
        if(u.celticName) fullName += " (" + u.celticName + ")";
        return fullName;
    }

    render() {
        return (
            <PrivateLayout>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-md-6 mx-auto">
                            {this.renderSearch()}
                            {this.renderList()}
                        </div>
                    </div>
                </div>
                {this.renderModal()}
            </PrivateLayout>
        );
    }

    renderSearch() {
        return (
            <input type="text" placeholder="Cherche un membre..." className="form-control my-2"
                   value={this.state.search} onChange={e => this.setState({search: e.target.value})}/>
        );
    }

    renderList() {
        return (
            <ul className="list-group">
                {this.filterUsers().map(u =>
                    <button type="button" className="list-group-item list-group-item-action" key={u.id}
                            onClick={() => this.showDetails(u.id)}>
                        <FontAwesomeIcon icon={["fal", "user-circle"]}/>
                        <span className="mx-3">{this.getFullName(u)}</span>
                    </button>
                )}
            </ul>
        );
    }

    renderModal() {
        if (!this.state.modal) return null;

        if (!this.state.user) return (
            <ModalLayout title="Chargement..." onClose={() => this.setState({modal: false, user: null})}>
                <h1 className="text-center"><FontAwesomeIcon icon={["fal", "axe"]} className="fa-spin"/></h1>
            </ModalLayout>
        );

        let u = this.state.user;
        return (
            <ModalLayout title={this.getFullName(u)}
                         onClose={() => this.setState({modal: false, user: null})}>
                <img className="card-img-top mb-2 rounded" src={"/images/membres/" + u.id + ".jpg"}
                     alt={this.getFullName(u)}/>

                <table className="table table-borderless">
                    <tbody>
                    <tr>
                        <td className="small-caps">Statut</td>
                        <td>
                            <span className={"badge badge-" + (u.isActive ? "info" : "secondary")}>
                                {"Membre" + (u.isActive ? " actif" : "")}
                            </span>
                        </td>
                    </tr>
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
}
