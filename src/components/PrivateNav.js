import React from 'react';

export default class PrivateNav extends React.Component {

    entries = [
        {
            'url': '/accueil',
            'title': 'Accueil',
            'icon': 'fas fa-search'
        },
        {
            'url': '/app/collection',
            'title': 'Collection',
            'icon': 'fas fa-copy'
        },
        {
            'url': '/app/statistics',
            'title': 'Statistics',
            'icon': 'fas fa-chart-pie'
        },
        {
            'url': '/app/decks',
            'title': 'Decks',
            'icon': 'fas fa-boxes'
        },
        {
            'url': '/app/buylists',
            'title': 'Buy lists',
            'icon': 'fas fa-dollar-sign'
        },
        {
            'url': '/logout',
            'title': 'Log out',
            'icon': 'fas fa-sign-out-alt'
        }
    ];

    constructor(props) {
        super(props);
        this.state = {
            entries: this.entries,
        };
    }

    render() {
        return (
            <nav className="navbar sticky-top navbar-light bg-light">
                <a className="navbar-brand" href="#">Viviskes</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
