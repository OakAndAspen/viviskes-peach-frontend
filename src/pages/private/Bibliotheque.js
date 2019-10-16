import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import CreateBookModal from "modals/CreateBookModal";
import UpdateBookModal from "modals/UpdateBookModal";
import PrivateLayout from "layouts/PrivateLayout";
import React from "react";
import {api} from "utils";

export default class Bibliotheque extends React.Component {

    messages = {
        emptyField: "Le nom du livre est obligatoire.",
        success: "Le livre a été enregistré!"
    };

    state = {
        books: [],
        users: [],
        search: "",
        activeModal: null,
        activeBook: null
    };

    componentDidMount() {
        this.getBooks();
        this.getUsers();
    }

    getBooks() {
        api("GET", "/book", {}, ({status, data}) => {
            if (data) this.setState({books: data.sort((a, b) => a.name.localeCompare(b.name))});
        });
    }

    getBook(id) {
        api("GET", "/book/" + id, {}, ({status, data}) => {
            if (data) this.setState({activeBook: data});
        });
    }

    getUsers() {
        api("GET", "/user", {}, ({status, data}) => {
            if (data) this.setState({
                users: data.sort((a, b) => a.firstName.localeCompare(b.firstName))
            });
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

                {this.state.activeModal === "create" && <CreateBookModal
                    onCreate={this.getBooks}
                    onClose={() => this.setState({activeModal: null, activeBook: null})}/>}

                {this.state.activeModal === "update" && <UpdateBookModal
                    book={this.state.activeBook} users={this.state.users}
                    onUpdate={() => {
                        this.getBook(this.state.activeBook.id);
                    }}
                    onClose={() => this.setState({activeModal: null, activeBook: null})}/>}
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
                            onClick={() => this.setState({activeModal: "create"})}>
                        <FAI icon={"plus"} className="mr-2"/>
                        <span>Ajouter un livre</span>
                    </button>
                </div>
            </div>
        );
    }

    renderList() {
        let search = this.state.search.toLowerCase();
        let books = this.state.books.filter(b => b.name.toLowerCase().includes(search));

        return (
            <ul className="list-group">
                {books.map(b =>
                    <button type="button" key={b.id}
                            className="list-group-item list-group-item-action d-flex align-items-center"
                            onClick={() => {
                                this.getBook(b.id);
                                this.setState({activeModal: "update"});
                            }}>
                        <FAI icon={["fal", "book"]}
                             title={b.isLoaned ? "Emprunté" : "Disponible"}
                             className={"text-" + (b.isLoaned ? "warning" : "success")}/>
                        <span className="mx-3">{b.name}</span>
                        <FAI icon={["fal", "info-square"]} className="ml-auto text-info"
                             title={"Voir le détail des emprunts"}/>
                    </button>
                )}
            </ul>
        );
    }


}
