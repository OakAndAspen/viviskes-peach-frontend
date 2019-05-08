import React from 'react';
import PrivateNav from "../components/PrivateNav";

export default class PrivateLayout extends React.Component {
    render() {
        let sectionStyle = {
            backgroundColor: "rgba(255,255,255,0.6)"
        };

        return (
            <div>
                <PrivateNav/>
                <section style={sectionStyle}>
                    {this.props.children}
                </section>
            </div>
        );
    }
}