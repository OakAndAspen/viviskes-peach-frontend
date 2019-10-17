import CustomEditor from "components/CustomEditor";
import ModalLayout from "layouts/ModalLayout";
import React from "react";
import {api} from "utils";

export default class CreateEventModal extends React.Component {

    state = {
        title: "",
        description: "",
        publicDescription: "",
        start: "",
        end: "",
        location: "",
        privacy: "u"
    };

    constructor(props) {
        super(props);
        this.createEvent = this.createEvent.bind(this);
    }

    createEvent() {
        let event = this.state;
        api("POST", "/event", {event: event}, ({status, data}) => {
            if (status === 201) {
                this.props.onSend();
                this.props.onClose();
            }
        });
    }

    render() {
        return (
            <ModalLayout title="Créer un évènement" onClose={this.props.onClose}>
                <input type="text" className="form-control my-2" placeholder="Titre"
                       value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>
                <select className="form-control my-2" value={this.state.privacy}
                        onChange={e => this.setState({privacy: e.target.value})}>
                    <option value="u">Public</option>
                    <option value="p">Privé</option>
                    <option value="i">Interne</option>
                </select>
                <div className="input-group my-2">
                    <div className="input-group-prepend"><span className="input-group-text">Du</span></div>
                    <input type="date" className="form-control"
                           value={this.state.start} onChange={e => this.setState({start: e.target.value})}/>
                </div>
                <div className="input-group my-2">
                    <div className="input-group-prepend"><span className="input-group-text">au</span></div>
                    <input type="date" className="form-control"
                           value={this.state.end} onChange={e => this.setState({end: e.target.value})}/>
                </div>
                <input type="text" className="form-control my-2" placeholder="Lieu"
                       value={this.state.location} onChange={e => this.setState({location: e.target.value})}/>
                <CustomEditor
                    content={this.state.description} placeholder="Description interne"
                    onChange={data => this.setState({description: data})}
                />
                <CustomEditor
                    content={this.state.publicDescription} placeholder="Description publique"
                    onChange={data => this.setState({publicDescription: data})}
                />
                <button type="button" className="btn btn-info w-100" onClick={this.createEvent}>Enregistrer</button>
            </ModalLayout>
        );
    }
}