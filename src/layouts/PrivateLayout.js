import React from "react";
import PrivateNav from "../components/PrivateNav";

export default class PrivateLayout extends React.Component {
    render() {
        return (
            <div>
                <PrivateNav/>
                <section>
                    {this.props.children}
                </section>
            </div>
        );
    }
}