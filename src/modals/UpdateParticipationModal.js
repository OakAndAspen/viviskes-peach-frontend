import ParticipationBadge from "components/ParticipationBadge";
import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api, getDate} from "utils";
import PropTypes from 'prop-types';

export default class UpdateParticipationModal extends React.Component {

    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
    }

    send(letter) {
        let participation = {
            event: this.props.event.id,
            user: this.props.user.id,
            day: this.props.date,
            status: letter
        };
        api("POST", "/participation", {participation: participation}, ({status, data}) => {
            if (status === 200) {
                this.props.onUpdate(data);
                this.props.onClose();
            }
        });
    }

    render() {
        let options = [
            {letter: "o", label: "J'organise"},
            {letter: "d", label: "Je participe"},
            {letter: "n", label: "Je ne participe pas"},
            {letter: "t", label: "Je ne sais pas encore"}
        ];
        return (
            <ModalLayout title={this.props.event.title + " | " + getDate(this.props.date)} onClose={this.props.onClose}>
                <div className="row">
                    {options.map(o =>
                        <div className="col-6">
                            <button className="btn btn-outline-dark m-2 w-100" onClick={() => this.send(o.letter)}>
                                <ParticipationBadge status={o.letter}/>
                                <span className="ml-2">{o.label}</span>
                            </button>
                        </div>
                    )}
                </div>
            </ModalLayout>
        );
    }
}

UpdateParticipationModal.propTypes = {
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
    event: PropTypes.object,
    user: PropTypes.object,
    date: PropTypes.string
};