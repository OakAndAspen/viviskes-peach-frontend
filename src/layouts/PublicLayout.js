import React from 'react';
import PublicNav from "../components/PublicNav";

export default class PublicLayout extends React.Component {

    render() {
        let sectionStyle = {
            backgroundColor: "rgba(255,255,255,0.6)"
        };

        return (
            <div>
                <PublicNav/>
                <section style={sectionStyle}>
                    {this.props.children}
                </section>
            </div>
        );
    }
}