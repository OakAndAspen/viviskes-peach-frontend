import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import React from "react";

export default class UnreadBadge extends React.Component {
    render() {
        let style = this.props.read ? "fal" : "fas";
        let title = this.props.read ? "" : "Y'a du nouveau!";

        return <FAI icon={[style, "circle"]} title={title}
                    className="text-info"/>;
    }
}