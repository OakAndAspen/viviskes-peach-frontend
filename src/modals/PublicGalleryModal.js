import ModalLayout from "layouts/ModalLayout";
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import React from "react";

export default class PublicGalleryModal extends React.Component {

    state = {
        index: 0
    };

    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next() {
        let length = this.props.event.photos.length;
        let index = this.state.index;
        if (index < (length - 1)) index++;
        else index = 0;
        this.setState({index: index});
    }

    previous() {
        let length = this.props.event.photos.length;
        let index = this.state.index;
        if (index > 0) index--;
        else index = length - 1;
        this.setState({index: index});
    }

    render() {
        let photo = this.props.event.photos[this.state.index];
        return (
            <ModalLayout title={this.props.event.title} onClose={this.props.onClose}>
                <div className="row">
                    <div className="col-2 d-flex align-items-center">
                        <span className="pointer display-4" onClick={this.previous} title="Précédent">
                            <FAI icon={"chevron-left"}/>
                        </span>
                    </div>
                    <div className="col-8">
                        <img src={photo.url} alt={"Photo n°" + photo.id} className="img-fluid rounded-top"/>
                    </div>
                    <div className="col-2 d-flex align-items-center">
                        <span className="pointer display-4" onClick={this.next} title="Suivant">
                            <FAI icon={"chevron-right"}/>
                        </span>
                    </div>
                </div>
            </ModalLayout>
        );
    }
}

PublicGalleryModal.propTypes = {
    event: PropTypes.object.isRequired,
    onClose: PropTypes.func
};