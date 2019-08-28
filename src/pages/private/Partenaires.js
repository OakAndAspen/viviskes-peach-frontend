import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import {apiUrl} from "config";
import $ from "jquery";
import ModalLayout from "layouts/ModalLayout";
import PrivateLayout from "layouts/PrivateLayout";
import TableLayout from "layouts/TableLayout";
import React from "react";

export default class Partenaires extends React.Component {

    emptyPartner = {
        id: null,
        label: "",
        url: ""
    };

    messages = {
        emptyField: "Un champ obligatoire n'a pas été rempli.",
        success: "Enregistré!"
    };

    state = {
        partners: [],
        modal: false,
        currentPartner: this.emptyPartner,
        alert: null,
        alertType: "danger",
        loading: false
    };

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.getPartners();
    }

    getPartners() {
        $.ajax({
            url: apiUrl + "/partners",
            method: "GET",
            success: res => {
                this.setState({partners: res});
            }
        });
    }

    updateField(field, value) {
        let cp = this.state.currentPartner;
        cp[field] = value;
        this.setState({currentPartner: cp});
    }

    checkErrors() {
        let cp = this.state.currentPartner;
        if (!cp.label) {
            this.setState({alert: this.messages.emptyField, alertType: "danger"});
            return false;
        }
        return true;
    }

    closeModal() {
        this.setState({
            modal: false,
            currentPartner: this.emptyPartner,
            alert: null
        });
    }

    send() {
        if (!this.checkErrors()) return null;
        let cp = this.state.currentPartner;

        $.ajax({
            url: apiUrl + "/partners" + (cp.id ? "/" + cp.id : ""),
            method: cp.id ? "PATCH" : "POST",
            data: cp,
            success: res => {
                this.getPartners();
                this.setState({alert: this.messages.success, alertType: "success"});
            }
        });
    }

    delete(id) {
        this.setState({loading: id});
        $.ajax({
            url: apiUrl + "/partners/" + id,
            method: "DELETE",
            success: res => {
                this.getPartners();
                this.setState({loading: false});
            }
        });
    }

    render() {
        return (
            <PrivateLayout>
                <div className="container py-4">
                    <div className="d-flex">
                        <div><h1>Partenaires</h1></div>
                        <div className="ml-auto">
                            <button type="button" className="btn btn-info"
                                    onClick={() => this.setState({modal: true})}>
                                <FAI icon="plus"/>
                                <span className="ml-2">Nouveau partenaire</span>
                            </button>
                        </div>
                    </div>
                    {this.renderTable()}
                </div>
                {this.state.modal && this.renderModal()}
            </PrivateLayout>
        );
    }

    renderTable() {
        return (
            <TableLayout>
                {this.state.partners.map(p =>
                    <tr key={p.id}>
                        <td>{p.label}</td>
                        <td><a href={"https://" + p.url}>{p.url}</a></td>
                        <td>
                            <FAI icon="pencil-alt" className="pointer text-info"
                                             onClick={() => this.setState({modal: true, currentPartner: p})}/>
                        </td>
                        <td>
                            {(this.state.loading === p.id) ?
                                <FAI icon="spinner" className="pointer text-danger fa-spin"/> :
                                <FAI icon={"trash-alt"} className="pointer text-danger"
                                                 onClick={() => this.delete(p.id)}/>
                            }
                        </td>
                    </tr>
                )}
            </TableLayout>
        );
    }

    renderModal() {
        let cp = this.state.currentPartner;

        return (
            <ModalLayout title="Nouveau partenaire" onClose={this.closeModal}>
                <input type="text" className="form-control my-2" placeholder="Nom"
                       value={cp.label} onChange={e => this.updateField("label", e.target.value)}/>
                <div className="input-group my-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text">http://</span>
                    </div>
                    <input type="text" className="form-control" placeholder="URL"
                           value={cp.url} onChange={e => this.updateField("url", e.target.value)}/>
                </div>

                <button className="btn btn-info w-100" onClick={this.send}>Enregistrer</button>
                {this.state.alert &&
                <div className={"my-2 alert alert-" + this.state.alertType}>{this.state.alert}</div>
                }
            </ModalLayout>
        );
    }
}
