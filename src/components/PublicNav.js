import React from 'react';
import "./Nav.css";
import {Link} from 'react-router-dom';

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
                    <Link to="/" className="navbar-brand">
                        <img src="/images/banner.svg" height="30" alt="Viviskes"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {this.entries.map(entry =>
                                <li className="nav-item">
                                    <Link className="nav-link" to={entry.url}>{entry.title}</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
