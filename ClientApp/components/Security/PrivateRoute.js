import React, { Component } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import axios from 'axios';
import Async from 'react-promise'

const PrivateRoute = ({ layout: Layout, component: Component, ...rest }) => {



    return (
        
            <Route
                {...rest}
                render={props =>
                    <Layout> <Async promise={CheckIfLoggedIn()} then={(val) => val ? (
                        <Component {...props} />  

                    ) : (
                            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                        )} /> </Layout>
                }
            />
     
    );
}
function CheckIfLoggedIn() {
    console.log('login contr');
    var token = window.localStorage.getItem('token');
    if (!token) {
        return Promise.resolve(false);
    }

    return axios.get('/validateToken')
        .then(function (response) {
            return true;
        })
        .catch(function (error) {

            if (error.response.status == 401) {
                return false;
            }
        });
}
export default PrivateRoute