import React from 'react';
import PrivateLayout from "../../layouts/PrivateLayout";
import Config from "../../Config";
import ForumBreadcrumbs from "../../components/ForumBreadcrumbs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import $ from "jquery";
import ModalLayout from "../../layouts/ModalLayout";
import CF from "../../CustomFunctions";
import moment from "moment";
import Avatar from "../../components/Avatar";
import TableLayout from "../../layouts/TableLayout";

export default class Sujet extends React.Component {

    state = {
        topic: null,
        modal: false
    };

    componentDidMount() {
        let id = this.props.match.params.topic;
        $.ajax({
            url: Config.apiUrl + "/topic/" + id,
            method: "GET",
            success: res => {
                this.setState({topic: res});
            }
        });
    }

    render() {
        if (!this.state.topic) return <h1>Loading...</h1>;
        return (
            <PrivateLayout>
                <ForumBreadcrumbs category={this.state.topic.category} topic={{label: this.state.topic.title}}/>
                <div className="container py-4" id="Sujet">
                    <div className="d-flex justify-content-between mb-2">
                        <h3>{this.state.topic.title}</h3>
                        <div>
                            <button className="btn btn-info ml-auto"
                                    onClick={() => this.setState({modal: true})}>
                                <FontAwesomeIcon icon="pen-fancy" className="mr-2"/>
                                Répondre
                            </button>
                        </div>
                    </div>
                    <TableLayout>
                        {this.state.topic.messages.map(m => this.renderMessage(m))}
                    </TableLayout>
                    <a className="btn btn-light btn-outline-info w-100 my-2" href="#MenuNav">
                        <FontAwesomeIcon icon="angle-double-up"/>
                        <span className="mx-2">Remonter en haut de la page</span>
                        <FontAwesomeIcon icon="angle-double-up"/>
                    </a>
                </div>
                {this.state.modal && this.renderModal()}
            </PrivateLayout>
        );
    }

    renderMessage(m) {
        return (
            <tr key={m.id}>
                <td>
                    <Avatar/>
                </td>
                <td>
                    <div className="d-flex">
                        <span className="text-muted small-caps">{CF.getShortName(m.author)}</span>
                        <span className="text-muted ml-auto">{moment(m.created).fromNow()}</span> <br/>
                    </div>
                    <span>{m.content}</span>
                </td>
            </tr>
        );
    }

    renderModal() {
        return (
            <ModalLayout title="Répondre" onClose={() => this.setState({modal: false})}>
                <textarea className="form-control my-2" placeholder="Message"/>
                <button className="btn btn-info w-100">Poster</button>
            </ModalLayout>
        );
    }

    renderAvatar(id) {
        let style = {
            borderRadius: "50%"
        };

        return (
            <img src={"/images/membres/" + id + ".jpg"} alt={"User n°" + id} style={style} className="img-fluid"/>
        );
    }
}
