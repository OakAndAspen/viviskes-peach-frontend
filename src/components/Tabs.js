import React from "react";
import "./Tabs.css";

export default class Tabs extends React.Component {

    render() {
        return (
            <ul className="nav nav-tabs nav-fill mb-4 w-100 display-4 border-0" id="Tabs">
                {this.props.entries.map((e, i) => {
                    let active = i === 0 ? " active" : "";

                    return (
                        <li className="nav-item" key={e.code}>
                            <a className={"bg-transparent border-dark text-dark small-caps nav-link" + active}
                               id={e.code + "-tab"} data-toggle="tab" href={"#" + e.code}>
                                {e.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }
}
