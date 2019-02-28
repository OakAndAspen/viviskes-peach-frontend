import React from 'react';
import "./Nav.css";

export default class Nav extends React.Component {

    entries = [
        {
            url: '/',
            title: 'Accueil',
        },
        {
            url: '/association',
            title: 'L\'association'
        },
        {
            url: '/histoire-vivante',
            title: 'Histoire vivante'
        },
        {
            url: '/galerie',
            title: 'Galerie'
        },
        {
            url: '/contact',
            title: 'Contact'
        }
    ];

    render() {
        return (
            <nav className="navbar navbar-expand-md sticky-top navbar-light bg-transparent">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src="/images/banner.svg" height="30" alt="Viviskes"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {this.entries.map(entry =>
                                <li className="nav-item">
                                    <a className="nav-link" href={entry.url}>{entry.title}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
