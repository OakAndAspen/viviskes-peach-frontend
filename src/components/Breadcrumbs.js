import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class Breadcrumbs extends React.Component {

    levels = [
        {
            label: "Forum",
            url: "/intranet/forum"
        },
        {
            label: "Catégorie 5",
            url: "/intranet/forum/5"
        },
        {
            label: "Sujet 45",
            url: "/intranet/forum/5/45"
        }
    ];

    render() {
        let style = {
            border: "1px solid #BBB"
        };


        return (
            <div className="w-100 bg-light small-caps py-2" style={style}>
                <div className="container">
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