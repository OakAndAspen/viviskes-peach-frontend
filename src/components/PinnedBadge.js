import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class PinnedBadge extends React.Component {
    render() {
        let style = this.props.pinned ? "fas" : "fal";
        let title = this.props.pinned && "Sujet épinglé";

        return <FontAwesomeIcon icon={[style, "star"]} title={title}
                                className="text-warning display-4"/>;
    }
}