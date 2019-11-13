import $ from 'jquery';
import PublicLayout from "layouts/PublicLayout";
import RecoverPasswordModal from "modals/RecoverPasswordModal";
import React from "react";
import {Redirect} from "react-router-dom";
import {api} from "utils";

export default class Login extends React.Component {

    state = {
        authKey: localStorage.authKey,
        error: null,
        modal: null
    };

    constructor(props) {
        super(props);
        this.keyDown = this.keyDown.bind(this);
        this.login = this.login.bind(this);
    }

    keyDown(e) {
        if (e.keyCode === 13) this.login();
    }

    login() {
        let email = $('#email').val();
        let password = $('#password').val();

        if (!email || !password) {
            this.setState({error: "Tous les champs sont obligatoires."});
            return null;
        }

        api("POST", "/login", {email: email, password: password}, ({status, data}) => {
            let error = null;
            switch (status) {
                case 404:
                    error = "Cette adresse email n'existe pas.";
                    break;
                case 403:
                    error = "Cet utilisateur a été désactivé.";
                    break;
                case 400:
                    error = "Le mot de passe est erroné.";
                    break;
                case 200:
                    localStorage.authKey = data.authKey;
                    localStorage.user = JSON.stringify(data.user);
                    this.setState({authKey: data.authKey});
                    break;
                default:
                    error = "Une erreur inconnue est survenue.";
            }

            if (error) this.setState({error: error});
        });
    }

    render() {
        if (this.state.authKey) {
            return <Redirect to='/intranet/forum'/>;
        }

        let style = {textAlign: 'center'};

        return (
            <PublicLayout>
                <div className='row'>
                    <form className='col-12 col-md-6 mx-auto my-4'>
                        <h1 className="text-center">Connexion à l'intranet</h1>
                        <input type='text' id='email' className='form-control' placeholder='Email'
                               onKeyDown={this.keyDown} style={style}/>
                        <input type='password' id='password' className='form-control my-2' placeholder='Mot de passe'
                               onKeyDown={this.keyDown} style={style}/>
                        <button type='button' className='btn btn-info w-100' id='logIn' onClick={this.login}>
                            Connexion
                        </button>
                        <small className="d-block text-info pointer text-center w-100 my-2"
                               onClick={() => this.setState({modal: "recoverPassword"})}>
                            Oups, j'ai oublié mon mot de passe...
                        </small>
                        {this.state.error &&
                        <div className='alert alert-warning mt-3' role='alert'>
                            {this.state.error}
                        </div>}
                    </form>
                </div>
                {this.state.modal === "recoverPassword" &&
                <RecoverPasswordModal onClose={() => this.setState({modal: null})}/>}
            </PublicLayout>
        );
    }
}