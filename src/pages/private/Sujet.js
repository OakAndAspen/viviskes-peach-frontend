import React from 'react';
import $ from "jquery";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CF from "../../CustomFunctions";
import Config from "../../Config";
import PrivateLayout from "../../layouts/PrivateLayout";
import ModalLayout from "../../layouts/ModalLayout";
import TableLayout from "../../layouts/TableLayout";
import Breadcrumbs from "../../components/Breadcrumbs";
import Avatar from "../../components/Avatar";
import Loader from "../../components/Loader";

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
        if (!this.state.topic) return <Loader/>;
        let topic = this.state.topic;
        let levels = [
            {label: "Forum", url: "/intranet/forum"},
            {label: topic.category.label, url: "/intranet/forum/" + topic.category.id},
            {label: topic.title}
        ];

        return (
            <PrivateLayout>
                <Breadcrumbs levels={levels}/>
                <div className="container py-4" id="Sujet">
                    <div className="d-flex justify-content-between mb-2">
                        <h3>{topic.title}</h3>
                        <div>
                            <button className="btn btn-info ml-auto"
                                    onClick={() => this.setState({modal: true})}>
                                <FontAwesomeIcon icon="pen-fancy" className="mr-2"/>
                                Répondre
                            </button>
                        </div>
                    </div>
                    <TableLayout>
                        {topic.messages.map(m => this.renderMessage(m))}
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
