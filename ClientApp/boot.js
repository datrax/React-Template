import "./css/site.css";
import "bootstrap";
import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import * as RoutesModule from "./routes";
import axios from "axios";
let routes = RoutesModule.routes;

function renderApp() {
  // This code starts up the React app when it runs in a browser. It sets up the routing
  // configuration and injects the app into a DOM element.
  const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter children={routes} basename={baseUrl} />
    </AppContainer>,
    document.getElementById("react-app")
    );
    axios.interceptors.request.use(function (config) {
        var token = window.localStorage.getItem('token');
        if (token != null) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, function (err) {
        return Promise.reject(err);
    });
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept("./routes", () => {
    routes = require("./routes").routes;
    renderApp();
  });
}
// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.



