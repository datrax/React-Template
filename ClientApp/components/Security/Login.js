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
            <div class="col-sm-4">
                <h2>Login</h2>
                <hr />
                <form action="/token" method="post" enctype="multipart/form-data">
                    <div class="form-group row">
                        <label for="username" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input class="form-control" id="username" name="username" placeholder="Email" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="password" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-10">
                            <button type="button" class="btn btn-primary" onClick={this.LoginClick}>Sign in</button>
                        </div>
                    </div>
                </form>
            </div>

        );
    }

    LoginClick = () => {
        var token = null;
        var that = this;
        axios.post('/token',
            {
                "login": document.getElementById('username').value,
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
