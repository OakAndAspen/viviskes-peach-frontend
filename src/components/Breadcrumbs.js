import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Breadcrumbs extends React.Component {

    render() {
        let style = {
            border: "1px solid #BBB"
        };

        return (
            <div className="w-100 bg-light small-caps py-2" style={style}>
                <div className="container">
                    <FontAwesomeIcon icon={["fal", "map-signs"]} className="mx-2 text-secondary"/>
                    {this.props.levels.map((level, i) => {
                        if (i === this.props.levels.length - 1) return <span>{level.label}</span>;
                        return (
                            <span className="d-inline-flex align-items-center">
                                <Link to={level.url}>{level.label}</Link>
                                <FontAwesomeIcon icon={["far", "angle-right"]} className="mx-2 text-secondary"/>
                            </span>
                        );
                    })}
                </div>
            </div>
        );
    }
}