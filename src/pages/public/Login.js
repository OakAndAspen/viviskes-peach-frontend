import $ from 'jquery';
import PublicLayout from "layouts/PublicLayout";
import React from "react";
import {Redirect} from "react-router-dom";
import {api} from "utils";

export default class Login extends React.Component {

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

        api("POST", "/login", {email: email, password: password}, ({status, data}) => {
            if (data.error) this.setState({loginError: data.error});
            else {
                localStorage.authKey = data.authKey;
                localStorage.user = JSON.stringify(data.user);
                this.setState({authKey: data.authKey});
            }
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
                        {this.state.loginError ?
                            <div className='alert alert-warning mt-3' role='alert'>
                                {this.state.loginError}
                            </div>
                            : null}
                    </form>
                </div>
            </PublicLayout>
        );
    }
}