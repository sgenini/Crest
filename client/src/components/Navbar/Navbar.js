import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBTooltip, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <div>
        <header>
            <MDBNavbar color="bg-dark" fixed="top" dark expand="md" scrolling transparent>
              <MDBNavbarBrand href="/">
                <strong className="text-uppercase">Crest</strong>
              </MDBNavbarBrand>
              {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink to="/home" className="text-uppercase">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/login" className="text-uppercase" onClick={localStorage.setItem("loggedIn","false")}>Log Out</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
        </header>
      </div>
    )
  }
}

export default Navbar;