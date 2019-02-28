import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.min';
import './index.css';
import App from './App';
import $ from 'jquery';
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

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
