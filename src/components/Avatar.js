import PropTypes from "prop-types";
import React from "react";
import "./Avatar.css";

export default class Avatar extends React.Component {
    render() {
        let url = this.props.user.avatar || "/images/default.png";
        let style = {
            backgroundImage: "url(" + url + ")"
        };
        return (
            <div className="Avatar" style={style}/>
        );
    }
}

Avatar.propTypes = {
    user: PropTypes.object
};