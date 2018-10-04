import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export class User extends Component  {
    constructor() {
        super();
    }
  render() {
    return (
      <div>
        <p>User</p>
        <p>
          Current user: <strong>{this.props.match.params.id}</strong>
        </p>                          
        <button>
          User
        </button>
      </div>
    );
  }


}
