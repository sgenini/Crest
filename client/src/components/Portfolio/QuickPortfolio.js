import React, {Component} from "react";
import API from "../../utils/API";
import {Link, Router} from "react-router-dom";
import Jumbotron from "../Jumbotron/index";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import 'jspdf-autotable';

export default class QuickPortfolio extends Component {
    state = {
        watchList: {},
        portfolio: [],
        updatePortfolio:[],
        userPortfolio:[],
        totalValue:0
    }
    
    componentDidMount() {
        API.getPertucularUserWatchList().then((res) => {
            this.setState({ watchList: res.data });
        }).then(() => {
            this.getUserPortfolio();
        });
    }
 
    //API AJAX Call to user transaction table and generate user portfolio updated new table to get profit loss 
    getUserPortfolio = () => {
        API.getUserPortfolioData(this.state.watchList.UserId).then((res) => {
            console.log(res.data);
            //this.setState({portfolio: res.data})
            this.setState({ updatePortfolio: res.data })
            const updatePort = res.data;
            const updateWatchList = [];
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
        this.setState({totalValue:totalStockValue});
        console.log(this.state.totalValue);
    }

    render (){

        return (
          <div className="container">
             <div className="row">
               <div className="col-md-12">
               {(this.state.userPortfolio).length === 0 ? (<div>Portfolio will appear here.</div>) : (
                <table id="mytable" className="table table-striped">
                 <thead className="table-dark">
                     <tr>
                         <th scope="col">Stock</th>
                         <th scope="col">Quantity</th>
                     </tr>
                 </thead>
                 <tbody>
                     {this.state.userPortfolio.map((data) => {
                         if (data.quantity != 0) {
                            return (
                            <tr>
                            <td><b>{data.symbol.toUpperCase()}</b></td>
                            <td>{data.quantity}</td>
                            </tr>)
                         }
                     })}
                 </tbody>
                </table>
                )}
                
               </div> 
             </div>
            </div>
    
        ) //Return Method end
      } //Render Method End
    } //Transaction class end 