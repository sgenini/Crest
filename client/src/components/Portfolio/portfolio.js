import React, { Component } from "react";
import API from "../../utils/API";
import { Link, Router } from "react-router-dom";
import Jumbotron from "../Jumbotron/index";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import 'jspdf-autotable';

import FolioPie from "../Charts/FolioPie.js";
// import FolioDoughnut from "../Charts/FolioDoughnut.js";

export default class Portfolio extends Component {
    state = {
        watchList: {},
        portfolio: [],
        updatePortfolio:[],
        userPortfolio:[],
        totalValue:0

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
        console.log("getUSerPort func hit");
        API.getUserPortfolioData(this.state.watchList.UserId).then((res) => {
            console.log(res.data);
            console.log("above is the data response from the get user porfolio function")
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
            totalStockValue +=(parseInt(el.Stockquantity)*parseFloat(el.latestPriceIEX));
        })
        this.setState({totalValue:totalStockValue});
        console.log(this.state.totalValue);
    }

    //Logout User Link 
    logoutUser = () => {
        //this.intervalClear();
        localStorage.removeItem("loggedIn");
        API.signOutUser().then((res) => {
        }).catch(err => console.log(err));
    }
    //Go to Home page
    goToHomePage = () => {
        this.props.history.push("/home");
    }
    //Go to Transaction page when user clicked on Transactions link
    userTransaction = () => {
        this.props.history.push("/transactions");
    }

    printDocument = () => {
        const input = document.getElementById('mytable');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png', 1.0);
                const pdf = new jsPDF('p', 'mm');
                pdf.addImage(imgData, 'PNG', 10, 10);
                // pdf.output('dataurlnewwindow');
                pdf.save("myDocument.pdf");
            });
    }

    render() {
        const updateWatchList = this.state;
        const totalValue = this.state;
        return (
           
             <div className="container">
             <Jumbotron />
             <hr />
             <div className="text-center">
                 <Link to={'/login'} onClick={this.logoutUser.bind(this)}>Logout</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                 <Link to={'/home'} onClick={this.goToHomePage.bind(this)}>Home</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                 <Link to={'/transactions'} onClick={this.userTransaction.bind(this)}>Transactions</Link>
            </div>
             <hr />
             <div className="row">
                 <div className="col-md-6">
                     <div className="container">
                         {/* <Link to={'/portfolio'} onClick={this.userPortfolio.bind(this)}>Portfolio</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;</span> */}
                         <button className="btn btn-info" onClick={this.printDocument.bind(this)}>Generate PDF Report</button>
                         <hr></hr>
                         <div className="row">
                             <div className="col-md-12">
                                 {(this.state.userPortfolio).length === 0 ? (<div><img src={require('../../image.png')} alt="stock" className="img-responsive" /></div>) : (
                                     <table id="mytable" className="table table-striped">
                                         <thead className="table-dark">
                                             <tr>
                                                 <th scope="col">Stock</th>
                                                 <th scope="col">Quantity</th>
                                                 <th scope="col">Live Stock Price</th>
                                                 <th scope="col">Current Total Value</th>
                                                 <th scope="col">Profit/Loss</th>
                                                 {/* <th scope="col">Purchase Date</th> */}
                                             </tr>
                                         </thead>
                                         <tbody>
                                             {this.state.userPortfolio.map((data) => {
                                                if (data.Stockquantity != 0) {
                                                 return (
                                                     <tr>
                                                         <td><b>{data.symbol.toUpperCase()}</b></td>
                                                         <td>{data.Stockquantity}</td>
                                                         <td>{data.latestPriceIEX}</td> 
                                                          <td>{(parseFloat(data.Stockquantity))*(data.latestPriceIEX).toFixed(2)}</td> 
                                                          <td style={((parseFloat(data.Stockquantity))*(data.latestPriceIEX)) > parseFloat(data.TotalPurchase) ? {color:"green"} : {color:"red"}}>{((parseFloat(data.Stockquantity))*(data.latestPriceIEX)) > parseFloat(data.TotalPurchase) ? (((parseFloat(data.Stockquantity))*(data.latestPriceIEX))-parseFloat(data.TotalPurchase)).toFixed(2) : (parseFloat(data.TotalPurchase)-(parseFloat(data.Stockquantity)*(data.latestPriceIEX))).toFixed(2)}</td> 
                                                     </tr>)
                                                }
                                             })}
                                         </tbody>
                                     </table>
                                 )}
                            </div>
                         </div>
                     </div>
                 </div>
                 {/* End of Stocklist column */}
                 
                <div className="col-md-6">
                        {this.state.userPortfolio.length === 0 ?
                            (
                                <div>
                                    <p>Your Portfolio is Empty!</p>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <FolioPie
                                        width="100%"
                                        height="600"
                                        data={this.state.userPortfolio}
                                    />
                                    {/* <FolioDoughnut
                                        width="100%"
                                        height="600"
                                        data={this.state.userPortfolio}
                                    /> */}
                                </div>
                         )
                     }
                 </div>
                 {/* End of Table column */}

                 

               </div> {/* Row div end */}

               <div className="row">
               <div className="col-lg-12">
               <table>
                   <thead className="table table-striped">
                   <tr className="table-dark">
                    <th scope="row">Intial Balance</th>
                    <th scope="row">Total Stock Value</th>
                    <th scope="row">Reamining Balance</th>
                   </tr>
                   </thead>
                   <tbody>
                     <tr>
                        <td>$20000.00</td>
                        <td>{(this.state.totalValue).toFixed(2)}</td>
                        {/* <td>{(parseFloat(20000.00)-parseFloat(this.state.totalValue)).toFixed(2)}</td> */}
                        <td>???</td>
                     </tr>
                   </tbody>
                </table>
               
                </div>
               </div>

           </div> //Container Div End

        )
    }   //Return and Render-Method End
} //Portfolio Class end 