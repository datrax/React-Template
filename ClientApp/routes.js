import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { Layout } from "./components/General/Layout";
import { SimpleLayout } from "./components/General/SimpleLayout";
import { Home } from "./components/Home";
import { UserList } from "./components/UserManagement/UserList";
import { User } from "./components/UserManagement/User";
import { Login } from "./components/Security/Login";
import PrivateRoute from "./components/Security/PrivateRoute";
export const routes = (
    <div>
        <RouteWithLayout path="/login" component={Login} layout={SimpleLayout} />
        <RouteWithLayout exact path="/" component={Home} layout={Layout} />
        <PrivateRoute path="/users" component={UserList} layout={Layout} />
        <RouteWithLayout path="/user/:id" component={User} layout={Layout} />
    </div>
);


function RouteWithLayout({ layout, component, ...rest }) {
    return (
        <Route {...rest} render={(props) =>
            React.createElement(layout, props, React.createElement(component, props))
        } />
    );
}
