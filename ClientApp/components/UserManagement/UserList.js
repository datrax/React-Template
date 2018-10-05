import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import axios from 'axios';

export class UserList extends Component {
    state = { users: [], loading: true };

    constructor(props) {
        super(props);

        axios.get("api/SampleData/Users")
    
            .then(response => {
                this.setState({ users: response.data, loading: false });
            });
    }

    render() {
        const contents = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            UserList.renderUserTable(this.state.users)
        );

        return (
            <div>
                <h1>Users</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    static renderUserTable(users) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Login</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.login}>
                            <td><Link to={`/user/${user.login}`}>{user.login}</Link> </td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
