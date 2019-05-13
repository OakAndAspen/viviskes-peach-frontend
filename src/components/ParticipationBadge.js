import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Config from "../Config";

export default class ParticipationBadge extends React.Component {
    render() {
        let part = Config.participation[this.props.status];

        return <FontAwesomeIcon icon={["fal", part.icon]}
                                title={part.label}
                                className="text-info display-4"/>;
    }
}