import CustomEditor from "components/CustomEditor";
import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";

export default class UpdateEventModal extends React.Component {

    state = {
        alert: null
    };

    constructor(props) {
        super(props);
        this.updateEvent = this.updateEvent.bind(this);
        this.state = this.props.event;
    }

    updateEvent() {
        let event = this.state;
        if (!event.title || !event.start) {
            this.setState({
                alert: {
                    text: "Le titre et la date de début sont obligatoires.",
                    color: "danger"
                }
            });
            return null;
        }
        if (!event.end) event.end = event.start;
        api("PUT", "/event/" + this.props.event.id, {event: event}, ({status, data}) => {
            if (status === 200) {
                this.props.onSend();
                this.props.onClose();
            }
        });
    }

    render() {
        let form = this.state;
        return (
            <ModalLayout title="Créer un évènement" onClose={this.props.onClose}>
                <input type="text" className="form-control my-2" placeholder="Titre"
                       value={form.title} onChange={e => this.setState({title: e.target.value})}/>
                <select className="form-control my-2" value={form.privacy}
                        onChange={e => this.setState({privacy: e.target.value})}>
                    <option value="u">Public</option>
                    <option value="p">Privé</option>
                    <option value="i">Interne</option>
                </select>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="isConfirmed"
                           onChange={e => this.setState({isConfirmed: e.target.checked})}
                           checked={form.isConfirmed}/>
                    <label className="form-check-label" htmlFor="isConfirmed">
                        Confirmé (décocher si c'est au statut de proposition)
                    </label>
                </div>
                <div className="input-group my-2">
                    <div className="input-group-prepend"><span className="input-group-text">Du</span></div>
                    <input type="date" className="form-control"
                           value={form.start.slice(0, 10)} onChange={e => this.setState({start: e.target.value})}/>
                </div>
                <div className="input-group my-2">
                    <div className="input-group-prepend"><span className="input-group-text">au</span></div>
                    <input type="date" className="form-control" value={form.end ? form.end.slice(0, 10) : ""}
                           onChange={e => this.setState({end: e.target.value})}/>
                </div>
                <input type="text" className="form-control my-2" placeholder="Lieu"
                       value={form.location} onChange={e => this.setState({location: e.target.value})}/>
                <CustomEditor
                    content={form.description} placeholder="Description interne"
                    onChange={data => this.setState({description: data})}
                />
                <CustomEditor
                    content={form.publicDescription} placeholder="Description publique"
                    onChange={data => this.setState({publicDescription: data})}
                />
                <button type="button" className="btn btn-info w-100" onClick={this.updateEvent}>Enregistrer</button>
                {form.alert &&
                <div className={"mt-2 alert alert-" + form.alert.color}>
                    {form.alert.text}
                </div>}
            </ModalLayout>
        );
    }
}