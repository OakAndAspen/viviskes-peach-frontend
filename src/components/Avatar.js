import React from "react";
import "./Avatar.css";

export default class Avatar extends React.Component {
    render() {
        let style = {
            backgroundImage: "url(/images/membres/1.jpg)"
        };
        return (
            <div className="Avatar" style={style}/>
        );
    }
}