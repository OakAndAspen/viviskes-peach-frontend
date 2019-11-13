import "font-awesome-light.config";
import "font-awesome-regular.config";
import "font-awesome-solid.config";
import Articles from "pages/private/Articles";
import Bibliotheque from "pages/private/Bibliotheque";
import Calendrier from "pages/private/Calendrier";
import Categorie from "pages/private/Categorie";
import Evenement from "pages/private/Evenement";
import Forum from "pages/private/Forum";
import Mediatheque from "pages/private/Mediatheque";
import Membres from "pages/private/Membres";
import Partenaires from "pages/private/Partenaires";
import Profil from "pages/private/Profil";
import Sujet from "pages/private/Sujet";
import Accueil from "pages/public/Accueil";
import Album from "pages/public/Album";
import Article from "pages/public/Article";
import Association from "pages/public/Association";
import Contact from "pages/public/Contact";
import Galerie from "pages/public/Galerie";
import HistoireVivante from "pages/public/HistoireVivante";
import Login from "pages/public/Login";
import Logout from "pages/public/Logout";
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Footer from "./components/Footer";

class App extends Component {
    render() {
        return (
            <Router>
                <div className='App h-100 d-flex flex-column'>
                    <section className="mb-auto">
                        <Switch>
                            <Route exact path='/' component={Accueil}/>
                            <Route exact path='/association' component={Association}/>
                            <Route exact path='/histoire-vivante' component={HistoireVivante}/>
                            <Route exact path='/histoire-vivante/:article' component={Article}/>
                            <Route exact path='/galerie' component={Galerie}/>
                            <Route exact path='/galerie/:id' component={Album}/>
                            <Route exact path='/contact' component={Contact}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/logout' component={Logout}/>

                            <PrivateRoute exact path='/intranet/forum' component={Forum}/>
                            <PrivateRoute exact path='/intranet/forum/:category' component={Categorie}/>
                            <PrivateRoute exact path='/intranet/forum/topic/:topic' component={Sujet}/>
                            <PrivateRoute exact path='/intranet/partenaires' component={Partenaires}/>
                            <PrivateRoute exact path='/intranet/calendrier' component={Calendrier}/>
                            <PrivateRoute exact path='/intranet/calendrier/:event' component={Evenement}/>
                            <PrivateRoute exact path='/intranet/membres' component={Membres}/>
                            <PrivateRoute exact path='/intranet/articles' component={Articles}/>
                            <PrivateRoute exact path='/intranet/bibliotheque' component={Bibliotheque}/>
                            <PrivateRoute exact path='/intranet/mediatheque' component={Mediatheque}/>
                            <PrivateRoute exact path='/intranet/mediatheque/:folder' component={Mediatheque}/>
                            <PrivateRoute exact path='/intranet/profil' component={Profil}/>
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

export default App;
