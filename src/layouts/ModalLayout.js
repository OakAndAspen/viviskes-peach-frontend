import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome/index";
import React from "react";

export default class ModalLayout extends React.Component {

    render() {
        let style = {
            backgroundColor: "rgba(100,100,100,0.7)",
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "100",
            overflow: "auto"
        };

        return (
            <div style={style}>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-md-8 col-lg-6 mx-auto">
                            <div className="card">
                                <div className="card-body pb-0">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="card-title">{this.props.title}</h5>
                                        <FAI icon="times" className="pointer" onClick={this.props.onClose}/>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}