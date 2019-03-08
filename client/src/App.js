import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Signup from "./components/Signup/signup.js";
import Login from "./components/Login/login.js";
import Home from "./components/Home/home.js";
import Portfolio from "./components/Portfolio/portfolio.js";
import Transactions from "./components/Transactions/transactions.js";
// import Jumbotron from "./components/Jumbotron";
import Topstock from "./components/Topstock/topstock.js";
import Allocation from "./components/Allocation/Allocation";

import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar"
import LoginUI from "./components/LoginUI/LoginUI"
import SignupUI from "./components/SignupUI/SignupUI"
import HomeUI from "./components/HomeUI/HomeUI"
import WatchlistUI from "./components/Watchlist/WatchlistUI"
import DefaultStock from "./components/Topstock/DefaultStock"
import CashCheck from "./components/CashCheck/CashCheck"
import PortfolioDiversityUI from "./components/Portfolio/PortfolioDiversityUI"
import PortfolioSummaryUI from "./components/Portfolio/PortfolioSummaryUI"
import PortfolioTransactionsUI from "./components/Portfolio/PortfolioTransactionsUI"

// import logo from "./logo.svg";
// import "./App.css";

class App extends Component {
  render() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    return (
      <Router>
      <div>
         <Navbar />
         <Switch>

           <Route exact path="/login" component={LoginUI} />
           <Route exact path="/signup" component={SignupUI} />
           <Route exact path="/landing" component={Landing} />

           {/* <Route exact path="/old-home" component={Home} />
           <Route exact path="/old-signup" component={Signup} />
           <Route exact path="/old-login" component={Login} />
           <Route exact path="/topstock" component={Topstock} />
           <Route exact path="/defaultStock" component={DefaultStock} />
           <Route exact path="/cashcheck" component={CashCheck} /> */}

           <Route exact path="/watchlist"
              render = {() => isLoggedIn ? (<Route component={WatchlistUI} />) : (<Route component={LoginUI}/>)} /> 

           <Route exact path="/allocate" 
              render = {() => isLoggedIn ? (<Route component={Allocation} />) : (<Route component={LoginUI}/>)} /> 

           <Route path="/PortfolioDiversityUI"
              render = {() => isLoggedIn ? (<Route component={PortfolioDiversityUI} />) : (<Route component={LoginUI}/>)} /> 

           <Route path="/PortfolioSummaryUI" 
              render = {() => isLoggedIn ? (<Route component={PortfolioSummaryUI} />) : (<Route component={LoginUI}/>)} /> 

           <Route path="/PortfolioTransactionsUI"
              render = {() => isLoggedIn ? (<Route component={PortfolioTransactionsUI} />) : (<Route component={LoginUI}/>)} /> 

           <Route path="/home"
              render={() => isLoggedIn ? (<Route component={HomeUI} /> ) : (<Route component={LoginUI} />)} />

           <Route path="/portfolio" 
              render={() => isLoggedIn ? ( <Route component={PortfolioDiversityUI} />) : (<Route component={Login} /> )} />

            <Route path="/transactions" 
              render={() => isLoggedIn ? ( <Route component={Transactions} />) : (<Route component={Login} /> )} />

            <Route exact path="*" component={Landing} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
