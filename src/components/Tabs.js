import React from 'react';
import "./Tabs.css";

export default class Tabs extends React.Component {

    render() {
        return (
            <ul className="nav nav-tabs nav-fill mb-4 w-100" id="Tabs" role="tablist">
                {this.props.entries.map((e, i) => {
                    let active = i === 0 ? " active" : "";
                    return (
                        <li className="nav-item" key={e.code}>
                            <a className={"nav-link" + active} id={e.code + "-tab"} data-toggle="tab"
                               href={"#" + e.code} role="tab" aria-controls={e.code} aria-selected="false">
                                {e.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }
}
