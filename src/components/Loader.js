import React from 'react';
import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";

export default class Loader extends React.Component {
    render() {
        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <h1 className="text-center">
                    Chargement...<br/>
                    <FAI icon={"axe"} className="fa-spin m-4"/>
                </h1>
            </div>
        );
    }
}