import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class UnreadBadge extends React.Component {
    render() {
        let style = this.props.read ? "fal" : "fas";
        let title = !this.props.read && "Y'a du nouveau!";

        return <FontAwesomeIcon icon={[style, "circle"]} title={title}
                                className="text-info display-4"/>;
    }
}