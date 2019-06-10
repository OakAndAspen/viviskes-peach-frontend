import React from 'react';
import "./Nav.css";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon as FAI} from '@fortawesome/react-fontawesome'

export default class PrivateNav extends React.Component {

    entries = [
        {
            url: '/intranet/forum',
            title: 'Forum',
            style: 'far',
            icon: 'comments'
        },
        {
            url: '/intranet/calendrier',
            title: 'Calendrier',
            style: 'far',
            icon: 'calendar-alt'
        },
        {
            url: '/intranet/bibliotheque',
            title: 'Bibliothèque',
            style: 'far',
            icon: 'books'
        },
        {
            url: '/intranet/mediatheque',
            title: 'Médiathèque',
            style: 'far',
            icon: 'file-pdf'
        },
        {
            url: '/intranet/articles',
            title: 'Articles',
            style: 'fas',
            icon: 'feather-alt'
        },
        {
            url: '/intranet/partenaires',
            title: 'Partenaires',
            style: 'far',
            icon: 'handshake'
        },
        {
            url: '/intranet/membres',
            title: 'Membres',
            style: 'fas',
            icon: 'user-friends'
        },
        {
            url: '/intranet/profil',
            title: 'Profil',
            style: 'fas',
            icon: 'user-circle'
        },
        {
            url: '/logout',
            title: 'Déconnexion',
            style: 'fas',
            icon: 'sign-out-alt'
        }
    ];

    render() {
        let iconStyle= {
            width: "25px",
            display: "inline-block",
            textAlign: "center"
        };

        return (
            <nav className="navbar navbar-expand-sm navbar-light" id="MenuNav">
                <div className="container py-2">
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
                                        <li className="nav-item small-caps" key={entry.url}>
                                            <Link className={"nav-link" + active} to={entry.url} title={entry.title}>
                                                <div style={iconStyle}>
                                                    <FAI icon={[entry.style, entry.icon]}/>
                                                </div>
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
