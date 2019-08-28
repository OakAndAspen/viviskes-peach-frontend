import React from "react";
import PublicNav from "../components/PublicNav";

export default class PublicLayout extends React.Component {

    render() {
        return (
            <div>
                <PublicNav/>
                <section>
                    {this.props.children}
                </section>
            </div>
        );
    }
}