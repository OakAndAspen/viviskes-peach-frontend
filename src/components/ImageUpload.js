import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import $ from "jquery";
import React from "react";
import {apiUrl} from "../config";
import Loader from "./Loader";
import PropTypes from 'prop-types';


export default class ImageUpload extends React.Component {

    state = {
        filename: "Choisis une image...",
        fileUrl: this.props.default || "default"
    };

    send(e) {
        this.setState({fileUrl: null});

        let files = e.target.files;
        if (!files.length) return null;
        let file = files[0];
        this.setState({filename: file.name});

        let formData = new FormData();
        formData.append("file", file);
        $.ajax({
            url: this.props.to,
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: res => {
                this.setState({fileUrl: apiUrl + res.url})
            }
        });
    }

    render() {
        let style = {
            borderWidth: "2px",
            borderStyle: "dashed"
        };

        return (
            <div className="p-3 border-secondary rounded" style={style}>
                <div className="text-center mb-2">
                    {!this.state.fileUrl ? <Loader/> : (this.state.fileUrl === "default" ?
                            <FAI icon={["fal", "image"]} className="display-1"/> :
                            <img src={this.state.fileUrl} className="img-fluid rounded" alt="Loading"/>
                    )}
                </div>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile"
                           onChange={e => this.send(e)} accept="image/png, image/jpeg"/>
                    <label className="custom-file-label" htmlFor="customFile">{this.state.filename}</label>
                </div>
            </div>
        );
    }
}

ImageUpload.propTypes = {
    default: PropTypes.string,
    to: PropTypes.string
};