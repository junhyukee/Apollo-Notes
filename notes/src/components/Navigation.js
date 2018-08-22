import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';

class Navigation extends Component {

    renderButtons = () => {
        const { loading, user } = this.props.data;

        if (loading) { return <div></div> }

        if (user) {
            return (
                <NavItem>
                    <NavLink>Logout</NavLink>
                </NavItem>
            )
        } else {
            return (
                <div>
                    <NavItem>
                        <NavLink tag={Link} to="/login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/signup">Signup</NavLink>
                    </NavItem>
                </div>
            )
        }
    }

    render() {
        return (
            <Navbar color="light">
                <NavbarBrand>Notes</NavbarBrand>
                <Nav>
                    <NavItem>
                        <NavLink tag={Link} to="/">View Notes</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/note/add">New Note</NavLink>
                    </NavItem>
                    {this.renderButtons()}
                </Nav>
            </Navbar>
        )
    }
}

export default graphql(query)(Navigation);