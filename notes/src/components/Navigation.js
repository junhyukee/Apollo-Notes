import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Navigation extends Component {

    onLogoutClick = () => {
        this.props.mutate({
            refetchQueries: [{ query }]
        });
    }

    renderButtons = () => {
        const { loading, user } = this.props.data;

        if (loading) { return <div></div> }

        if (user) {
            return (
                <React.Fragment>
                    <NavItem>
                        <NavLink tag={Link} to="/notes/add">New Note</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.onLogoutClick}>Logout</NavLink>
                    </NavItem>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <NavItem>
                        <NavLink tag={Link} to="/login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/signup">Signup</NavLink>
                    </NavItem>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <Navbar color="light">
                <NavbarBrand tag={Link} to="/">Notes</NavbarBrand>
                <Nav>
                    {this.renderButtons()}
                </Nav>
            </Navbar>
        )
    }
}

const mutation = gql`
    mutation {
        logout {
            id
            username
        }
    }
`

export default graphql(mutation)(graphql(query)(Navigation));