import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
/*import {
    Link
} from 'react-router-dom'
*/
class NavBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/search">Image Seeker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/search">Search</Nav.Link>
                        <Nav.Link href="/images-list">Images</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>);
    }
}

export default NavBar;
