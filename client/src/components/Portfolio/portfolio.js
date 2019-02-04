import React, {Component} from "react";
import API from "../../utils/API";
import {Link, Router} from "react-router-dom";
import Jumbotron from "../Jumbotron/index";

export default class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchList:{},            
        };
    }

    componentDidMount(){
        //this.getPertucularUserWatchList();
        //this.myUser = setTimeout(() => this.getPerticularUserWatchList.bind(this), 500);
            API.getPertucularUserWatchList().then((res) => {
                console.log(res.data);
                this.setState({watchList:res.data});
                console.log(this.state.watchList.stock);
            }).then(() => {
                console.log("dot then function ran");
                this.getUserPortfolio();
            });
        }
    //}

    getUserPortfolio = () => {
        API.getUserPortfolioData(this.state.watchList.UserId).then((res) => {
            console.log("front portfolio route hit");
        })
    }

    //Go to Home page
    goToHomePage = () => {
        // clearTimeout(this.myUser);
        this.props.history.push("/home");
    }

  render(){
      
    return (
      <div className="container">
          <Jumbotron />
          <hr></hr>
          <Link to={'/login'} onClick={this.logoutUser}>Logout</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Link to={'/home'} onClick={this.goToHomePage.bind(this)}>Home</Link>
          <hr></hr>
        <div className="row">
            <div className="col-md-8">

            </div>

            <div className="col-md-4">
            
            </div>
        </div> {/* Row div end */}

     </div> //Container Div End

    )}   //Return and Render-Method End
} //Portfolio Class end 