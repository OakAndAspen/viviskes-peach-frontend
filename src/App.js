import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.css';
import Footer from "./components/Footer";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";

library.add(fab, far, fas);

class App extends Component {
    render() {
        return (
            <Router>
                <div className='App'>
                    <Switch>
                        <Route exact path='/' component={publicRoutes.Accueil}/>
                        <Route exact path='/association' component={publicRoutes.Association}/>
                        <Route exact path='/histoire-vivante' component={publicRoutes.HistoireVivante}/>
                        <Route exact path='/histoire-vivante/:article' component={publicRoutes.Article}/>
                        <Route exact path='/galerie' component={publicRoutes.Galerie}/>
                        <Route exact path='/galerie/:id' component={publicRoutes.Album}/>
                        <Route exact path='/contact' component={publicRoutes.Contact}/>
                        <Route exact path='/login' component={publicRoutes.Login}/>
                        <Route exact path='/logout' component={publicRoutes.Logout}/>

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
                    <Footer/>
                </div>
            </Router>
        );
    }
}

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
                        pathname: '/login',
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

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
    Login: Loadable({
        loader: () => import('./pages/public/Login'),
        loading: Loading,
    }),
    Logout: Loadable({
        loader: () => import('./pages/public/Logout'),
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
        loader: () => import('./pages/private/Profil'),
        loading: Loading,
    })
};

export default App;
