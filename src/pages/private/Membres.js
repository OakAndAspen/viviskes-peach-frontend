import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import PrivateLayout from "layouts/PrivateLayout";
import CreateUserModal from "modals/CreateUserModal";
import ShowUserModal from "modals/ShowUserModal";
import React from "react";
import {api, getName} from "utils";

export default class Membres extends React.Component {

    state = {
        users: [],
        user: null,
        search: "",
        modal: null
    };

    constructor(props) {
        super(props);
        this.showDetails = this.showDetails.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        api("GET", "/user", {}, ({status, data}) => {
            if (data) {
                data.sort((a, b) => a.firstName.localeCompare(b.firstName));
                this.setState({users: data});
            }
        });
    }

    showDetails(id) {
        api("GET", "/user/" + id, {}, ({status, data}) => {
            if (data) this.setState({user: data, modal: "showUser"});
        });
    }

    filterUsers() {
        let search = this.state.search.toLowerCase();
        return this.state.users.filter(u => {
            if (u.firstName.toLowerCase().includes(search) || u.lastName.toLowerCase().includes(search)) {
                return true;
            }
            if (u.celticName && u.celticName.toLowerCase().includes(search)) return true;
            return false;
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
                {this.state.modal === "showUser" &&
                <ShowUserModal
                    user={this.state.user}
                    onArchive={this.getUsers}
                    onClose={() => this.setState({modal: null})}/>}
                {this.state.modal === "createUser" &&
                <CreateUserModal
                    onCreate={this.getUsers}
                    onClose={() => this.setState({modal: null})}/>}
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
                            onClick={() => this.setState({modal: "createUser"})}>
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
                        <span className="mx-3">{getName(u, false, true)}</span>
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
}
