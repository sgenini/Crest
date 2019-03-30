import React, {Component} from "react";
import API from "../../utils/API.js";

export default class Newsfeed extends Component {
    state = {
          stockResponse:{},
          newsResponse:[],
          oneStockNews:[],
          stock: ["aapl", "googl", "fb"],
          endpoint: "https://ws-api.iextrading.com/1.0/tops",
        }
    componentDidMount(){
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
            // console.log("res.data")
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
                // console.log(res.data);
                this.setState({oneStockNews: res.data});
            })
        }

    render(){
      //const response = {};
      const stockResponse = this.state;
      // const {symbol} = this.state;
        // console.log(this.state.stockResponse);
    //   console.log(this.state.newsResponse);
      //console.log(this.state.response.symbol + this.state.response.lastSalePrice);
      return(
        <div className="container">
         <div  className="row">
     
               {/* Market News Rendering here */}
               <div style={{overflow:"auto", opacity: ".9"}} className="col-md-12 pb-3">
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



        </div> 
        </div>
        
       );
    }}
