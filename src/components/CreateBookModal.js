import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";

export default class CreateBookModal extends React.Component {

    state = {
        status: "",
        name: ""
    };

    constructor(props) {
        super(props);

        this.createBook = this.createBook.bind(this);
    }

    createBook() {
        let book = {name: this.state.name};
        api("POST", "/book", {book: book}, ({status, data}) => {
            if (status === 201) {
                this.props.onCreate();
                this.props.onClose();
            }
        });
    }

    render() {
        return (
            <ModalLayout title="Ajouter un livre" onClose={this.props.onClose}>
                <div className="row">
                    <div className="col-12">
                        <input type="text" placeholder="Nom" className="form-control my-1"
                               value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
                    </div>
                    {this.state.name &&
                    <div className="col-12">
                        <button type="button" className="btn btn-info w-100 my-1" onClick={this.createBook}>
                            Enregistrer
                        </button>
                    </div>
                    }
                </div>
            </ModalLayout>
        );
    }
}