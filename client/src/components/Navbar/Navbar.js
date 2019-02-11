import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBTooltip, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import API from "../../utils/API"

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
  logoutUser = () => {
      //this.intervalClear();
      localStorage.removeItem("loggedIn");
      API.signOutUser().then((res) => {
          console.log(res);
      }).catch(err => console.log(err));
  }
    //Go to Home page
  goToHomePage = () => {
    this.props.history.push("/home");
  }

  render() {
    const isLoggedIn = localStorage.getItem("loggedIn");
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
                    <MDBNavLink to="/home" className="text-uppercase" onClick={this.goToHomePage.bind(this)}>Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    {isLoggedIn ? (<MDBNavLink  to="/login" className="text-uppercase" onClick={this.logoutUser.bind(this)}>Log Out</MDBNavLink>): null}
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