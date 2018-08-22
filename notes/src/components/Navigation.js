import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
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
                <NavItem>
                    <NavLink tag={Link} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/signup">Signup</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}

export default Navigation;