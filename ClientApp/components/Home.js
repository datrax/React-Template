import React, { Component } from "react";
import { RouteComponentProps } from "react-router";

export class Home extends Component {
    render() {
        return (
            <div>
       
                <h1 onClick={() => {
                    this.props.history.push(`/Counter`);
                }}>Hello, world!</h1>
                <p>Welcome, this is a simple template of React + ES6 application with token based authentication for User management route (login - admin, password - 12345)</p>
                
            </div>
        );
    }
    componentWillMount() {
    }
}
