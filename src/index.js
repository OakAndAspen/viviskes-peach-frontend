import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import $ from 'jquery';
import moment from "moment";
import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';


$.ajaxSetup({
    crossOrigin: true,
    accept: 'application/json',
    beforeSend: function (request) {
        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.authKey);
    },
    error: function (jqXHR) {
        if (jqXHR.status === 403) {
            localStorage.clear();
        } else {
            alert('An error occured (' + jqXHR.status + ' ' + jqXHR.statusText + ')');
        }
    }
});

moment.updateLocale('en', {
    relativeTime : {
        future: "dans %s",
        past:   "il y a %s",
        s  : 'quelques secondes',
        ss : '%d secondes',
        m:  "une minute",
        mm: "%d minutes",
        h:  "une heure",
        hh: "%d heures",
        d:  "un jour",
        dd: "%d jours",
        M:  "un mois",
        MM: "%d mois",
        y:  "une année",
        yy: "%d ans"
    },
    weekdays : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    weekdaysShort : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
