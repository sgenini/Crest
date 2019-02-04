import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import API from "../../utils/API.js";
import { DH_NOT_SUITABLE_GENERATOR } from "constants";
// import Conditiontable from "./condition.js"
import Jumbotron from "../Jumbotron/index";


//stock: ["spy","dai","ndaq","iwm","aapl", "googl", "fb"]
//var stockArr =[];
export default class Topstock extends Component {
    state = {
          stockResponse:{},
          newsResponse:[],
          oneStockNews:[],
          stock: ["aapl", "googl", "fb"],
          endpoint: "https://ws-api.iextrading.com/1.0/tops",
        }
    componentDidMount(){
        //COMMENTED SOCKET IO QUOTES FOR NOW TO GET OTHER OPTIONS
        // const{endpoint} = this.state;
        // const socket = socketIOClient(endpoint);
        // socket.on('connect', () => {
        //     // Subscribe to topics (i.e. appl,fb,aig+)
        //     //socket.on('message', message => console.log(message))
        //     socket.emit('subscribe', this.state.stock.join(","))
        //     // Unsubscribe from topics (i.e. aig+)
        //     //socket.emit('unsubscribe', 'aig+')
        //     socket.on('message', (message) => {
        //       //this.state.stockResponse.empty();
        //       let livesymbol = JSON.parse(message)
        //       stockArr.push(livesymbol);
        //       this.setState({stockResponse:stockArr});
        //       stockArr.length = 0;
        //         //console.log((JSON.parse(message)));
        //       })
        //   })
            // API.alphaVantageCall().then((res) => {
            //     console.log(res)
            // });   
        this.intervalId = setInterval(this.autoStockData.bind(this), 1000);
        // this.newsIntervalId = setInterval(this.autoNewsData.bind(this), 60000);
        this.autoNewsData();
      }
      componentWillUnmount(){
        clearInterval(this.intervalId);
        // clearInterval(this.newsIntervalId);
      }
       autoStockData = () => {
        let symbols = this.state.stock.join(",") 
        API.batchStock(symbols).then((res) => {
            console.log("res.data")
            this.setState({stockResponse:res.data});
           })
        }
        autoNewsData = () => {
            API.iexMarketNews().then((res) => {
                this.setState({newsResponse:res.data})
            })
        }

        handleInputChange=(event) => {
            const{name, value} = event.target;
            this.setState({[name]: value});
        }
        handleFormSubmit = (event) => {
            event.preventDefault();
            // const stockTic = {
            //     symbol: this.state.symbol,
            // }
            this.setState({symbol:this.state.symbol});
            console.log(this.state.symbol);
            API.iexStockNews(this.state.symbol).then((res) => {
                console.log(res.data);
                this.setState({oneStockNews: res.data});
            })
        }

    render(){
      //const response = {};
      const stockResponse = this.state;
      // const {symbol} = this.state;
        console.log(this.state.stockResponse);
    //   console.log(this.state.newsResponse);
      //console.log(this.state.response.symbol + this.state.response.lastSalePrice);
      return(
        <div className="container">
         <div  className="row">
     
             <div style={{textAlign:"center"}} className="col-md-4">
             <div  className="row">
             <div className="col-md-12">
             {this.state.stockResponse
                ? (
             <div className="list-overflow-container">
               <ul className="list-group">
                   {Object.keys(this.state.stockResponse).map((key, i) => {
                       return (
                        <li style={{height:60}}key={i} className="list-group-item">
                        <div><h5 style={{display:"inline", float:"left"}}><span>{this.state.stockResponse[key].quote.symbol} : {this.state.stockResponse[key].quote.latestPrice.toFixed(2)}</span></h5>
                        <div style={{display:"inline", float:"right"}}><h5 style={(this.state.stockResponse[key].quote.change > 0) ? {color:"green"} : {color:"red"}}>{this.state.stockResponse[key].quote.change}</h5></div></div><br />
                        <div><p style={{display:"inlineBlock", float:"middle", fontSize:14}}>{this.state.stockResponse[key].quote.companyName}</p></div>
                    </li>
                       )})}
               </ul>
             </div>
                )
              : <div>Loading...</div>}
             </div>
             </div>
                    
              {/* Form to get perticular stock news */}
             <div  style={{marginTop:10}}className="row">
             <div className="col-md-12">
                 <form className="form">
                   <div className="form-group">
               {/* <label htmlFor="email">Email:</label> */}
                   <input type="text"
                     onChange={this.handleInputChange}
                     value={this.state.symbol}
                     name="symbol"
                     placeholder="GOOG"/>
                   </div>
                 <button className="btn btn-lg btn-info" onClick={this.handleFormSubmit}>Get Stock News</button>
               </form>
             </div>
             </div>

            {/* perticular stock news render */}
            <section>
             <div  style={{marginTop:10, height: 500, overflow:"auto"}} className="row">
             <div className="col-md-12">
                   <div className="list-overflow-container">
                     {this.state.oneStockNews ? (
                           <ul className="list-group">
                             {this.state.oneStockNews.map((news) => {
                             return (
                                 <li className="list-group-item">
                                     <h3><span>{news.headline}</span></h3>
                                     {/* <p><span>{news.summary}</span></p> */}
                                     <a rel="noreferrer noopener" target="_blank" href={news.url}>Read More...</a>
                                 </li>
                             );
                         })}
                           </ul>
                         ) : (
                           <h3 className="container">No News To Display</h3>
                         )}
                     </div>
             </div>
             </div>
             </section>

             </div>  {/* Col md 4 row end */}
     
               {/* Market News Rendering here */}
               <div style={{height: 1000, overflow:"auto"}} className="col-md-8">
               <div className="list-overflow-container">
               {this.state.newsResponse ? (
                     <ul className="list-group">
                       {this.state.newsResponse.map((news) => {
                       return (
                           <li className="list-group-item">
                               <h3><span>{news.headline}</span></h3>
                               <p><span>{news.summary}</span></p>
                               <a rel="noreferrer noopener" target="_blank" href={news.url}>Read More...</a>
                           </li>
                       );
                   })}
                     </ul>
                   ) : (
                     <h3 className="container">No News To Display</h3>
                   )}
               </div>
               </div>   {/*News Div End*/}



        </div>  {/*  Row div end */}
        </div>
           );   //map return function end
    }
}
