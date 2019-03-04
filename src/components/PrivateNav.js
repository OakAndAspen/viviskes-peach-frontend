import React from 'react';
import "./Nav.css";
import {Link} from 'react-router-dom';

export default class PrivateNav extends React.Component {

    entries = [
        {
            url: '/intranet/forum',
            title: 'Forum',
            icon: 'far fa-comments'
        },
        {
            url: '/intranet/calendrier',
            title: 'Calendrier',
            icon: 'far fa-calendar-alt'
        },
        {
            url: '/intranet/bibliotheque',
            title: 'Bibliothèque',
            icon: 'fas fa-book'
        },
        {
            url: '/intranet/mediatheque',
            title: 'Médiathèque',
            icon: 'far fa-file-pdf'
        },
        {
            url: '/intranet/articles',
            title: 'Articles',
            icon: 'fas fa-feather-alt'
        },
        {
            url: '/intranet/partenaires',
            title: 'Partenaires',
            icon: 'far fa-handshake'
        },
        {
            url: '/intranet/membres',
            title: 'Membres',
            icon: 'fas fa-user-friends'
        },
        {
            url: '/intranet/profil',
            title: 'Profil',
            icon: 'fas fa-user-circle'
        },
        {
            url: '/logout',
            title: 'Déconnexion',
            icon: 'fas fa-sign-out-alt'
        }
    ];

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light" id="PublicNav">
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
                            {this.entries.map(entry => {
                                    let active = window.location.pathname === entry.url ? " active" : "";
                                    return (
                                        <li className="nav-item" key={entry.url}>
                                            <Link className={"nav-link" + active} to={entry.url} title={entry.title}>
                                                <i className={entry.icon}/>
                                                <span className="ml-3 d-sm-none">{entry.title}</span>
                                            </Link>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
