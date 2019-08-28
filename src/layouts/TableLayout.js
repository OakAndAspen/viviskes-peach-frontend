import React from "react";
import "./TableLayout.css";

export default class TableLayout extends React.Component {
    render() {
        let tableStyle = {
            borderTopWidth: "none"
        };

        let hover = this.props.hoverable ? " table-hover" : "";

        return (
            <table className={"table-light w-100 rounded TableLayout" + hover} style={tableStyle}>
                <tbody>
                {this.props.children}
                </tbody>
            </table>
        );
    }
}