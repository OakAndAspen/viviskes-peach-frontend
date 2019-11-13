import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import ModalLayout from "layouts/ModalLayout";
import PropTypes from 'prop-types';
import React from "react";
import {api, apiPostImages} from "utils";

export default class UpdateGalleryModal extends React.Component {

    state = {
        photos: [],
        filename: "Ajouter une photo...",
        status: 0
    };

    constructor(props) {
        super(props);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
    }

    componentDidMount() {
        this.getPhotos();
    }

    getPhotos() {
        api("GET", "/photo", {event: this.props.event.id}, ({status, data}) => {
            this.setState({
                photos: data.sort((a, b) => b.id - a.id)
            });
        });
    }

    uploadPhoto(e) {
        let files = e.target.files;
        if (!files.length) return null;
        let file = files[0];
        this.setState({
            filename: file.name,
            status: 1
        });

        let formData = new FormData();
        formData.append("file", file);
        formData.append("event", this.props.event.id);
        apiPostImages("/photo", formData, ({status, data}) => {
            this.setState({status: status === 201 ? 2 : 3});
            this.getPhotos();
        });
    }

    deletePhoto(id) {
        api("DELETE", "/photo/" + id, {}, ({status, data}) => {
            if (status === 200) {
                this.getPhotos();
            }
        });
    }

    render() {
        return (
            <ModalLayout title={this.props.event.title} onClose={this.props.onClose}>
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="addPhoto"
                               onChange={e => this.uploadPhoto(e)} accept="image/png, image/jpeg"/>
                        <label className="custom-file-label" htmlFor="addPhoto">
                            {this.state.filename}
                        </label>
                    </div>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button">
                            {this.state.status === 0 && <FAI icon="upload"/>}
                            {this.state.status === 1 && <FAI icon="spinner" spin/>}
                            {this.state.status === 2 && <FAI icon="check"/>}
                            {this.state.status === 3 && <FAI icon="exclamation-triangle"/>}
                        </button>
                    </div>
                </div>
                <div className="row">
                    {this.state.photos.map(p =>
                        <div className="col-12 col-sm-6" key={p.id}>
                            <img src={p.url} alt={"Photo n°" + p.id} className="img-fluid rounded-top"/>
                            <div className="bg-danger text-center text-light rounded-bottom pointer w-100 mb-2 py-2"
                                 title="Supprimer" onClick={() => this.deletePhoto(p.id)}>
                                Supprimer
                            </div>
                        </div>
                    )}
                </div>
            </ModalLayout>
        );
    }
}

UpdateGalleryModal.propTypes = {
    event: PropTypes.object.isRequired,
    onClose: PropTypes.func
};