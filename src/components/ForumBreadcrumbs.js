import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class ForumBreadcrumbs extends React.Component {

    render() {
        let style = {
            border: "1px solid #BBB"
        };

        let cat = this.props.category || null;
        let topic = this.props.topic || null;

        return (
            <div className="w-100 bg-light small-caps py-2" style={style}>
                <div className="container">
                    <Link to="/intranet/forum">Forum</Link>
                    {cat && chevron}
                    {cat && (cat.id ?
                        <Link to={"/intranet/forum/" + cat.id}>{cat.label}</Link> :
                        <span>{cat.label}</span>
                    )}
                    {topic && chevron}
                    {topic && (topic.id ?
                        <Link to={"/intranet/forum/" + cat.id + "/" + topic.id}>{topic.label}</Link> :
                        <span>{topic.label}</span>
                    )}
                </div>
            </div>
        );
    }
}

const chevron = <FontAwesomeIcon icon="chevron-right" className="mx-2"/>;