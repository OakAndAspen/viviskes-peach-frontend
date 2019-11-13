import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import Loader from "components/Loader";
import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api, getDate, getName} from "utils";

export default class UpdateBookModal extends React.Component {

    state = {
        selectedUser: null,
        user: JSON.parse(localStorage.getItem("user"))
    };

    constructor(props) {
        super(props);

        this.createLoan = this.createLoan.bind(this);
        this.updateLoan = this.updateLoan.bind(this);
    }

    createLoan(userId) {
        if (!userId) return null;

        let loan = {user: userId, book: this.props.book.id};
        api("POST", "/loan", {loan: loan}, ({status, data}) => {
            if (status === 201) this.props.onUpdate();
        });
    }

    updateLoan(id) {
        api("PUT", "/loan/" + id, {}, ({status, data}) => {
            if (status === 200) this.props.onUpdate();
        });
    }

    delete(id) {
        api("DELETE", "/book/" + id, {}, ({status, data}) => {
            if (status === 200) {
                this.props.onDelete();
                this.props.onClose();
            }
        });
    }

    render() {
        let book = this.props.book;
        let userId = this.state.selectedUser || this.props.users[0].id;

        if (!book) return (
            <ModalLayout title="Chargement..." onClose={this.props.onClose}>
                <Loader/>
            </ModalLayout>
        );

        return (
            <ModalLayout title={book.name} onClose={this.props.onClose}>
                {this.state.user.isAdmin &&
                <button className="btn btn-danger my-2" onClick={() => this.delete(book.id)}>
                    <FAI icon="trash-alt"/>
                    <span className="ml-2">Supprimer ce livre</span>
                </button>
                }
                <table className="table table-borderless">
                    <tbody>
                    <tr>
                        <th>Emprunté par</th>
                        <th>du</th>
                        <th>au</th>
                    </tr>
                    {book.loans.sort((a, b) => a.start - b.start).map((l, i) =>
                        <tr key={i}>
                            <td>{getName(l.user)}</td>
                            <td>{getDate(l.start)}</td>
                            <td>{getDate(l.end) ||
                            <button className="btn btn-info" onClick={() => this.updateLoan(l.id)}>
                                <FAI icon={["far", "check"]}/>
                                <span className="ml-1">Rendu</span>
                            </button>
                            }</td>
                        </tr>
                    )}
                    {!book.isLoaned &&
                    <tr>
                        <td>
                            <select className="form-control" value={userId}
                                    onChange={e => this.setState({selectedUser: e.target.value})}>
                                {this.props.users.map(u =>
                                    <option value={u.id} key={u.id}>{getName(u)}</option>
                                )}
                            </select>
                        </td>
                        <td colSpan={2}>
                            <button className="btn btn-info w-100"
                                    onClick={() => this.createLoan(userId)}>
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
}