import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class UnreadBadge extends React.Component {
    render() {
        if (this.props.read) return <FontAwesomeIcon icon={["fal", "circle"]}
                                                     className="text-light display-4"
                                                     title="Y'a du nouveau!"/>;
        return <FontAwesomeIcon icon={["fal", "exclamation-circle"]}
                                className="text-info display-4"/>;
    }
}