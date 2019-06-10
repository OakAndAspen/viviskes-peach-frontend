import React from 'react';
import PrivateLayout from "../../layouts/PrivateLayout";
import $ from "jquery";
import Config from "../../Config";
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import ModalLayout from "../../layouts/ModalLayout";
import Loader from "../../components/Loader";
import CF from "../../CustomFunctions";

// TODO: Modifier ou supprimer un livre

export default class Bibliotheque extends React.Component {

    messages = {
        emptyField: "Le nom du livre est obligatoire.",
        success: "Le livre a été enregistré!"
    };

    state = {
        allBooks: [],
        search: "",
        detailsModal: false,
        createModal: false,
        book: null,
        alert: null,
        alertType: "danger",
        form: {
            name: ""
        },
        allUsers: [],
        selectedUser: null
    };

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        this.getAllBooks();
        this.getAllUsers();
    }

    getAllBooks() {
        $.ajax({
            url: Config.apiUrl + "/library",
            method: "GET",
            success: res => {
                res.sort((a, b) => a.name.localeCompare(b.name));
                this.setState({allBooks: res});
            }
        });
    }

    getAllUsers() {
        $.ajax({
            url: Config.apiUrl + "/users",
            method: "GET",
            success: res => {
                res.sort((a, b) => a.firstName.localeCompare(b.firstName));
                this.setState({allUsers: res, selectedUser: res[0].id});
            }
        });
    }

    isLoaned(book) {
        let isLoaned = false;
        for (let loan of book.loans) {
            if (!loan.end) isLoaned = true;
        }
        return isLoaned;
    }

    showDetails(id) {
        this.setState({detailsModal: true});
        $.ajax({
            url: Config.apiUrl + "/library/" + id,
            method: "GET",
            success: res => {
                this.setState({book: res});
            }
        });
    }

    filterBooks() {
        let search = this.state.search.toLowerCase();
        return this.state.allBooks.filter(b => b.name.toLowerCase().includes(search));
    }

    updateField(field, value) {
        let form = this.state.form;
        form[field] = value;
        this.setState({form: form});
    }

    checkErrors() {
        let f = this.state.form;

        if (!f.name) {
            this.setState({alert: this.messages.emptyField, alertType: "danger"});
            return false;
        }

        return true;
    }

    send() {
        if (!this.checkErrors()) return null;
        this.setState({alert: null});
        let data = this.state.form;

        $.ajax({
            url: Config.apiUrl + "/library",
            method: "POST",
            data: data,
            success: res => {
                this.setState({alert: this.messages.success, alertType: "success"});
                this.getAllBooks();
            }
        });
    }

    sendLoan(user, book) {
        if (!user || !book) return null;
        $.ajax({
            url: Config.apiUrl + "/library/loan",
            method: "POST",
            data: {
                userId: user,
                bookId: book
            },
            success: res => {
                this.setState({
                    alert: null,
                    detailsModal: false,
                    book: null
                });
                this.getAllBooks();
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
                    <input type="text" placeholder="Cherche un livre..." className="form-control my-2"
                           value={this.state.search} onChange={e => this.setState({search: e.target.value})}/>
                </div>
                <div className="col-12 col-sm-6">
                    <button type="button" className="btn btn-info w-100 my-2"
                            onClick={() => this.setState({createModal: true})}>
                        <FAI icon={"plus"} className="mr-2"/>
                        <span>Ajouter un livre</span>
                    </button>
                </div>
            </div>
        );
    }

    renderList() {
        return (
            <ul className="list-group">
                {this.filterBooks().map(b =>
                    <button type="button" className="list-group-item list-group-item-action d-flex align-items-center"
                            key={b.id} onClick={() => this.showDetails(b.id)}>
                        <FAI icon={["fal", "book"]}
                                         title={this.isLoaned(b) ? "Emprunté" : "Disponible"}
                                         className={"text-" + (this.isLoaned(b) ? "warning" : "success")}/>
                        <span className="mx-3">{b.name}</span>
                        <FAI icon={["fal", "info-square"]} className="ml-auto text-info"
                                         title={"Voir le détail des emprunts"}/>
                    </button>
                )}
            </ul>
        );
    }

    renderDetailsModal() {
        if (!this.state.detailsModal) return null;

        let book = this.state.book;

        if (!book) return (
            <ModalLayout title="Chargement..." onClose={() => this.setState({detailsModal: false, book: null})}>
                <Loader/>
            </ModalLayout>
        );

        return (
            <ModalLayout title={book.name}
                         onClose={() => this.setState({detailsModal: false, book: null})}>
                <table className="table table-borderless">
                    <tbody>
                    <tr>
                        <th>Emprunté par</th>
                        <th>du</th>
                        <th>au</th>
                    </tr>
                    {book.loans.sort((a, b) => b.start - a.start).map((l, i) =>
                        <tr key={i}>
                            <td>{CF.getName(l.user)}</td>
                            <td>{CF.getDate(l.start)}</td>
                            <td>{CF.getDate(l.end) ||
                            <button className="btn btn-info" onClick={() => this.sendLoan(l.user.id, book.id)}>
                                <FAI icon={["far", "check"]}/>
                                <span className="ml-1">Rendu</span>
                            </button>
                            }</td>
                        </tr>
                    )}
                    {!this.isLoaned(book) &&
                    <tr>
                        <td>
                            <select className="form-control" value={this.state.selectedUser}
                                    onChange={e => this.setState({selectedUser: e.target.value})}>
                                {this.state.allUsers.map(u =>
                                    <option value={u.id} key={u.id}>{CF.getName(u)}</option>
                                )}
                            </select>
                        </td>
                        <td colSpan={2}>
                            <button className="btn btn-info w-100"
                                    onClick={() => this.sendLoan(this.state.selectedUser, book.id)}>
                                Emprunter
                            </button>
                        </td>
                    </tr>
                    }
                    </tbody>
                </table>
            </ModalLayout>
        );
    }

    renderCreateModal() {
        if (!this.state.createModal) return null;
        let f = this.state.form;
        return (
            <ModalLayout title="Ajouter un livre"
                         onClose={() => this.setState({createModal: false})}>
                <div className="row">
                    <div className="col-12">
                        <input type="text" placeholder="Nom" className="form-control my-1"
                               value={f.name} onChange={e => this.updateField("name", e.target.value)}/>
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
