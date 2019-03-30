import React, { Component } from "react";
import API from "../../utils/API";
import { Link, Router } from "react-router-dom";
import Jumbotron from "../Jumbotron/index";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import 'jspdf-autotable';

import FolioPie from "../Charts/FolioPie.js";
// import FolioDoughnut from "../Charts/FolioDoughnut.js";

export default class TotalValue extends Component {
    state = {
        watchList: {},
        portfolio: [],
        updatePortfolio:[],
        userPortfolio:[],
        totalValue:0,
        userCash: 0,
        totalStockValue: 0

        // chartData: []
    }

    componentDidMount() {
        API.getPertucularUserWatchList().then((res) => {
            this.setState({ watchList: res.data });
        }).then(() => {
            this.getUserPortfolio();
            this.checkCash();
        });
    }

    //Check the cash value 
    checkCash = () => {
            console.log("check cash func hit");
     API.getCashValue()
         .then(res => {
            console.log("checkcash() ", res);
            console.log("above is the res dot data from checkCash");
            this.setState({userCash: res.data});
        })
        .catch(err => console.log(err))
    
     }

    //API AJAX Call to user transaction table and generate user portfolio updated new table to get profit loss 
    getUserPortfolio = () => {
        API.getUserPortfolioData(this.state.watchList.UserId).then((res) => {
            console.log(res.data);
            console.log("above is the res.data from getUserPortfolio in TotalValue.js")
            //this.setState({portfolio: res.data})
            this.setState({ updatePortfolio: res.data })
            const updatePort = res.data;
            const updateWatchList = [];
            console.log("this.state.updatePortfolio", this.state.updatePortfolio)
            this.state.updatePortfolio.forEach(function (el) {
                updateWatchList.push(el.symbol)
                //return updateWatchList
            })

            //const userWatchlist = this.state.updatePortfolio[this.state.updatePortfolio.length-1].symbols.join(",");
            //console.log(updateWatchlist.join(","));
            API.batchStock(updateWatchList).then((res) => {
                //console.log(this.state.updatePortfolio);
                //   console.log(res.data);
                for (let k in res.data) {
                    //        console.log(k, res.data[k].quote.latestPrice);
                    for (let i = 0; i < updatePort.length; i++) {
                        if (k.toLowerCase() === updatePort[i].symbol) {
                            updatePort[i]["latestPriceIEX"] = res.data[k].quote.latestPrice;
                        }
                    }
               }
            //   console.log(updatePort);
                 this.setState({userPortfolio: updatePort})
                 this.totalPortfolio();
             //console.log(price);

            })
        })
    }

    totalPortfolio = () => {
         let totalStockValue = 0;
        this.state.userPortfolio.forEach(function(el){
            totalStockValue +=(parseInt(el.quantity)*parseFloat(el.latestPriceIEX));
        })
        this.setState({totalStockValue})
        this.setState({totalValue: totalStockValue + this.state.userCash });
        console.log(this.state.totalValue);
    }


    render() {
      var stockValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.state.totalStockValue);
      var cashRemaining = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.state.userCash);
      var totalPortfolio = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.state.totalValue);
      var madeProfit = (this.state.totalStockValue + this.state.userCash) >= 20000;

        return (
          <div>
            {stockValue} (Stock) + {cashRemaining} (Cash) = <p style={ madeProfit ? {color:"green"} : {color:"red"} }>{totalPortfolio} Total Value</p>
          </div>
        )
          
    }   //Return and Render-Method End
} //Portfolio Class end 