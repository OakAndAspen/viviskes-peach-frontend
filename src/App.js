import "font-awesome-light.config";
import "font-awesome-regular.config";
import "font-awesome-solid.config";
import React, {Component} from "react";
import Loadable from 'react-loadable';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer";
import Loader from "./components/Loader";

class App extends Component {
    render() {
        return (
            <Router>
                <div className='App h-100 d-flex flex-column'>
                    <section className="mb-auto">
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
                            <PrivateRoute exact path='/intranet/forum/topic/:topic'
                                          component={privateRoutes.Sujet}/>
                            <PrivateRoute exact path='/intranet/partenaires' component={privateRoutes.Partenaires}/>
                            <PrivateRoute exact path='/intranet/calendrier' component={privateRoutes.Calendrier}/>
                            <PrivateRoute exact path='/intranet/calendrier/:event' component={privateRoutes.Evenement}/>
                            <PrivateRoute exact path='/intranet/membres' component={privateRoutes.Membres}/>
                            <PrivateRoute exact path='/intranet/articles' component={privateRoutes.Articles}/>
                            <PrivateRoute exact path='/intranet/bibliotheque' component={privateRoutes.Bibliotheque}/>
                            <PrivateRoute exact path='/intranet/mediatheque' component={privateRoutes.Mediatheque}/>
                            <PrivateRoute exact path='/intranet/mediatheque/:folder' component={privateRoutes.Mediatheque}/>
                            <PrivateRoute exact path='/intranet/profil' component={privateRoutes.Profil}/>
                        </Switch>
                    </section>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

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
        loading: Loader,
    }),
    Association: Loadable({
        loader: () => import('./pages/public/Association'),
        loading: Loader,
    }),
    HistoireVivante: Loadable({
        loader: () => import('./pages/public/HistoireVivante'),
        loading: Loader,
    }),
    Article: Loadable({
        loader: () => import('./pages/public/Article'),
        loading: Loader,
    }),
    Galerie: Loadable({
        loader: () => import('./pages/public/Galerie'),
        loading: Loader,
    }),
    Album: Loadable({
        loader: () => import('./pages/public/Album'),
        loading: Loader,
    }),
    Contact: Loadable({
        loader: () => import('./pages/public/Contact'),
        loading: Loader,
    }),
    Login: Loadable({
        loader: () => import('./pages/public/Login'),
        loading: Loader,
    }),
    Logout: Loadable({
        loader: () => import('./pages/public/Logout'),
        loading: Loader,
    }),
};

const privateRoutes = {
    Forum: Loadable({
        loader: () => import('./pages/private/Forum'),
        loading: Loader,
    }),
    Categorie: Loadable({
        loader: () => import('./pages/private/Categorie'),
        loading: Loader,
    }),
    Sujet: Loadable({
        loader: () => import('./pages/private/Sujet'),
        loading: Loader,
    }),
    Partenaires: Loadable({
        loader: () => import('./pages/private/Partenaires'),
        loading: Loader,
    }),
    Calendrier: Loadable({
        loader: () => import('./pages/private/Calendrier'),
        loading: Loader,
    }),
    Evenement: Loadable({
        loader: () => import('./pages/private/Evenement'),
        loading: Loader,
    }),
    Membres: Loadable({
        loader: () => import('./pages/private/Membres'),
        loading: Loader,
    }),
    Articles: Loadable({
        loader: () => import('./pages/private/Articles'),
        loading: Loader,
    }),
    Bibliotheque: Loadable({
        loader: () => import('./pages/private/Bibliotheque'),
        loading: Loader,
    }),
    Mediatheque: Loadable({
        loader: () => import('./pages/private/Mediatheque'),
        loading: Loader,
    }),
    Profil: Loadable({
        loader: () => import('./pages/private/Profil'),
        loading: Loader,
    })
};

export default App;
