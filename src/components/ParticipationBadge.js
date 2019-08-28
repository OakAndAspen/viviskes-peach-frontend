import {FontAwesomeIcon as FAI} from "@fortawesome/react-fontawesome";
import React from "react";

export default class ParticipationBadge extends React.Component {
    participation = {
        o: {
            label: "J'organise",
            icon: "plus",
            color: "primary"
        },
        d: {
            label: "Je participe",
            icon: "check",
            color: "success"
        },
        n: {
            label: "Je ne participe pas",
            icon: "times",
            color: "danger"
        },
        t: {
            label: "Participation indéfinie",
            icon: "question",
            color: "secondary"
        }
    };

    render() {
        let part = this.participation[this.props.status];

        return <FAI icon={["fas", part.icon]}
                                title={part.label}
                                className={"display-4 text-" + part.color}/>;
    }
}