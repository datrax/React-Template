import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import axios from 'axios';

export class Login extends Component {
    constructor() {
        super();
        this.LoginClick = this.LoginClick.bind(this);
    }
    state = {
        redirectToReferrer: false
    };
    render() {

        const { redirectToReferrer } = this.state;
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        console.log(from);
        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div className="container">
                <div className="row vertical-offset-100">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Please sign in</h3>
                            </div>
                            <div className="panel-body">
                                <form accept-charset="UTF-8" role="form">
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="E-mail" id = "email" name="email" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Password" id="password" name="password" type="password" />
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input name="remember" type="checkbox" value="Remember Me" /> Remember Me
			    	    	</label>
                                        </div>
                                        <input className="btn btn-lg btn-success btn-block" type="button" value="Login" onClick={this.LoginClick}/>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    LoginClick = () => {
        var token = null;
        var that = this;
        axios.post('/token',
            {
                "login": document.getElementById('email').value,
                "password": document.getElementById('password').value
            })
            .then(function (response) {
                token = response.data['access_token'];
                window.localStorage.setItem('token', token);
                that.setState({ redirectToReferrer: true });
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.interceptors.request.use(function (config) {

            if (token != null) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        }, function (err) {
            return Promise.reject(err);
        });

    }
}
