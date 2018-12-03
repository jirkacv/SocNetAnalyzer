import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export default class Navigation extends Component {
    render() {
        return (
            <Navbar color="light" light expand="md" >
                <NavbarBrand href="/">SocNet Analyzer</NavbarBrand>
                <span>Simple anonymized data analyzer</span>
            </Navbar>)
    }
}