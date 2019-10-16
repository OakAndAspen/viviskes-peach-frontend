import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import cn from "classnames";
import React from "react";

export default class IconText extends React.Component {
    render() {
        return (
            <span>
                <FAI icon={["fal", this.props.icon]} className={cn(this.props.spin && "fa-spin")}/>
                <span className="ml-2">{this.props.text}</span>
            </span>
        );
    }
}