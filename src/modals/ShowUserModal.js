import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api, getName} from "utils";

export default class ShowUserModal extends React.Component {

    state = {
        authUser: JSON.parse(localStorage.getItem("user"))
    };

    constructor(props) {
        super(props);
        this.archive = this.archive.bind(this);
    }

    archive(id) {
        let user = {isArchived: true};
        api("PUT", "/user/" + id, {user: user}, ({status, data}) => {
            if (status === 200) {
                this.props.onClose();
                this.props.onArchive();
            }
        });
    }

    render() {
        let u = this.props.user;
        if (!u) return (
            <ModalLayout title="Chargement..." onClose={this.props.onClose}>
                <h1 className="text-center"><FAI icon={["fal", "axe"]} className="fa-spin"/></h1>
            </ModalLayout>
        );

        return (
            <ModalLayout title={getName(u)} onClose={this.props.onClose}>
                <img className="card-img-top mb-2 rounded"
                     src={u.avatar || "/images/default.png"}
                     alt={u.firstName + " n'a pas encore choisi d'avatar."}/>

                <table className="table table-borderless">
                    <tbody>
                    <tr>
                        <td className="small-caps">Statuts</td>
                        <td>
                            {(!u.isActive && !u.isFighting && !u.isAdmin) && "-"}
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
                    <tr>
                        <td className="small-caps">Adresse</td>
                        {!u.address ? <td>-</td> :
                            <td>{u.address} <br/> {u.npa + " " + u.city}</td>}
                    </tr>
                    <tr>
                        <td className="small-caps">Email</td>
                        <td>{u.email || "-"}</td>
                    </tr>
                    <tr>
                        <td className="small-caps">Natel</td>
                        <td>{u.phone || "-"}</td>
                    </tr>
                    <tr>
                        <td className="small-caps">Parrainé(e) par</td>
                        <td>{u.mentor ? getName(u.mentor) : "-"}</td>
                    </tr>
                    <tr>
                        <td className="small-caps"> Parrain / marraine de</td>
                        <td>{u.newbie ? getName(u.newbie) : "-"}</td>
                    </tr>
                    </tbody>
                </table>
                {this.state.authUser.isAdmin &&
                <button className="btn btn-danger" onClick={() => this.archive(u.id)}
                        title={u.firstName + " ne pourra plus se connecter à l'intranet et n'apparaîtra plus sur les " +
                        "listes de membres. Ses posts ne seront pas supprimés."}>
                    <FAI icon="trash-alt"/>
                    <span className="ml-2">Archiver {u.firstName}</span>
                </button>}
            </ModalLayout>
        );
    }
}