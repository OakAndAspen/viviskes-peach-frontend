import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.css';
import $ from 'jquery';
import Config from './Config';

const Loading = () => <div>Loading...</div>;

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            localStorage.authKey ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

const PublicNav = Loadable({
    loader: () => import('./components/PublicNav'),
    loading: Loading
});

const PrivateNav = Loadable({
    loader: () => import('./components/PrivateNav'),
    loading: Loading
});

const publicRoutes = {
    Accueil: Loadable({
        loader: () => import('./pages/public/Accueil'),
        loading: Loading,
    }),
    Association: Loadable({
        loader: () => import('./pages/public/Association'),
        loading: Loading,
    }),
    HistoireVivante: Loadable({
        loader: () => import('./pages/public/HistoireVivante'),
        loading: Loading,
    }),
    Article: Loadable({
        loader: () => import('./pages/public/Article'),
        loading: Loading,
    }),
    Galerie: Loadable({
        loader: () => import('./pages/public/Galerie'),
        loading: Loading,
    }),
    Album: Loadable({
        loader: () => import('./pages/public/Album'),
        loading: Loading,
    }),
    Contact: Loadable({
        loader: () => import('./pages/public/Contact'),
        loading: Loading,
    }),
};

const privateRoutes = {
    Forum: Loadable({
        loader: () => import('./pages/private/Forum'),
        loading: Loading,
    }),
    Categorie: Loadable({
        loader: () => import('./pages/private/Categorie'),
        loading: Loading,
    }),
    Sujet: Loadable({
        loader: () => import('./pages/private/Sujet'),
        loading: Loading,
    }),
    Partenaires: Loadable({
        loader: () => import('./pages/private/Partenaires'),
        loading: Loading,
    }),
    Calendrier: Loadable({
        loader: () => import('./pages/private/Calendrier'),
        loading: Loading,
    }),
    Evenement: Loadable({
        loader: () => import('./pages/private/Evenement'),
        loading: Loading,
    }),
    Membres: Loadable({
        loader: () => import('./pages/private/Membres'),
        loading: Loading,
    }),
    Articles: Loadable({
        loader: () => import('./pages/private/Articles'),
        loading: Loading,
    }),
    Bibliotheque: Loadable({
        loader: () => import('./pages/private/Bibliotheque'),
        loading: Loading,
    }),
    Mediatheque: Loadable({
        loader: () => import('./pages/private/Mediatheque'),
        loading: Loading,
    }),
    Profil: Loadable({
        loader: () => import('./pages/private/Forum'),
        loading: Loading,
    })
};

class App extends Component {
    render() {
        return (
            <Router>
                <div className='App'>
                    <Switch>
                        <Route path='/intranet' component={PrivateNav}/>
                        <Route path='/' component={PublicNav}/>
                    </Switch>
                    <section>
                        <Switch>
                            <Route exact path='/' component={publicRoutes.Accueil}/>
                            <Route exact path='/association' component={publicRoutes.Association}/>
                            <Route exact path='/histoire-vivante' component={publicRoutes.HistoireVivante}/>
                            <Route exact path='/histoire-vivante/:article' component={publicRoutes.Article}/>
                            <Route exact path='/galerie' component={publicRoutes.Galerie}/>
                            <Route exact path='/galerie/:id' component={publicRoutes.Album}/>
                            <Route exact path='/contact' component={publicRoutes.Contact}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/logout' component={Logout}/>

                            <PrivateRoute exact path='/intranet/forum' component={privateRoutes.Forum}/>
                            <PrivateRoute exact path='/intranet/forum/:category' component={privateRoutes.Categorie}/>
                            <PrivateRoute exact path='/intranet/forum/:category/:topic'
                                          component={privateRoutes.Sujet}/>
                            <PrivateRoute exact path='/intranet/partenaires' component={privateRoutes.Partenaires}/>
                            <PrivateRoute exact path='/intranet/calendrier' component={privateRoutes.Calendrier}/>
                            <PrivateRoute exact path='/intranet/calendrier/:event' component={privateRoutes.Evenement}/>
                            <PrivateRoute exact path='/intranet/membres' component={privateRoutes.Membres}/>
                            <PrivateRoute exact path='/intranet/articles' component={privateRoutes.Articles}/>
                            <PrivateRoute exact path='/intranet/bibliotheque' component={privateRoutes.Bibliotheque}/>
                            <PrivateRoute exact path='/intranet/mediatheque' component={privateRoutes.Mediatheque}/>
                            <PrivateRoute exact path='/intranet/profil' component={privateRoutes.Profil}/>
                        </Switch>
                    </section>
                    <footer>
                        <img src="/images/footer.png" alt="Footer" className="img-fluid"/>
                        <div id="FooterText">
                            <div className="container text-secondary text-center py-3">
                                <div className="row">
                                    <div className="col-md-4 text-md-right pr-md-4">
                                        <h4>Contact</h4>
                                        <p>
                                            viviskes@gmail.com<br/>
                                            CCP: 12-812812-7<br/>
                                            IBAN: CH43 0900 0000 1281 2812 7
                                        </p>
                                    </div>
                                    <div className="col-md-4 px-md-4">
                                        <h4>Liens utiles</h4>
                                        <p>
                                            <Link to="/">Site internet</Link><br/>
                                            <Link to="/intranet/forum">Intranet</Link>
                                        </p>
                                    </div>
                                    <div className="col-md-4 text-md-left pl-md-4">
                                        <h4>Copyrights</h4>
                                        <p>
                                            Site - Irina Despot<br/>
                                            Artwork - Jonathan Schaffner<br/>
                                            Contenu - Viviskes
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </Router>
        );
    }
}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authKey: localStorage.authKey,
            loginError: null
        };
        this.render();
        this.keyDown = this.keyDown.bind(this);
        this.login = this.login.bind(this);
    }

    keyDown(e) {
        if (e.keyCode === 13) this.login();
    }

    login() {
        let email = $('#email').val();
        let password = $('#password').val();

        $.ajax({
            method: 'POST',
            url: Config.apiUrl + '/login',
            data: {email: email, password: password},
            context: this
        }).done((data) => {
            if (data.error) this.setState({loginError: data.error});
            else {
                localStorage.authKey = data.authKey;
                this.setState({authKey: data.authKey});
            }
        });
    }

    render() {
        if (this.state.authKey) {
            return <Redirect to='/app/advanced-search'/>;
        }

        let style = {textAlign: 'center'};

        return (
            <div className='row'>
                <form className='col-12 col-md-6 m-auto'>
                    <img src={Config.imgFolder + '/logo.png'} className='img-fluid mt-3 mb-5' alt='MtgManager'/>
                    <input type='text' id='email' className='form-control' placeholder='Email'
                           onKeyDown={this.keyDown} style={style}/>
                    <input type='password' id='password' className='form-control my-2' placeholder='Password'
                           onKeyDown={this.keyDown} style={style}/>
                    <button type='button' className='btn btn-info w-100' id='logIn' onClick={this.login}>
                        Log in
                    </button>
                    <p className="text-muted my-2">No account yet? <Link to="/signup">Sign up!</Link></p>
                    {this.state.loginError ?
                        <div className='alert alert-warning mt-3' role='alert'>
                            {this.state.loginError}
                        </div>
                        : null}
                </form>
            </div>
        );
    }
}

class Logout extends React.Component {
    render() {
        localStorage.clear();
        return <Redirect to='/'/>
    }
}

export default App;
