import axios from "axios";

export default {
  //Singup New User
  createUser: function(userdata) {
    return axios.post("/user/signup", userdata);
  },
  //Login User
  loginUser: function(userdata) {
    return axios.post("/user/login", userdata);
  },
  //Sign Out Logged in User
  signOutUser: function(){
    return axios.get("/user/logout")
  },
  //Get Single Stock Data
  singleStock: function(symbol){
    return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10`)
  },
  batchStock: function(symbols){
    return axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote,news,chart&range=1m&last=5`)
  },
  iexMarketNews: function(){
    return axios.get(`https://api.iextrading.com/1.0/stock/market/news`);
  },
  iexStockNews: function(stockStmbol){
    return axios.get(`https://api.iextrading.com/1.0/stock/${stockStmbol}/news`);
  },
  getPertucularUserWatchList: function(){
    return axios.get("/user/home/watchlist");
  },
  updatePertucularUserWatchList: function(stockTicker){
    return axios.put("/user/home/watchlist", stockTicker);
  },
  getUserPortfolioData: function(id){
    return axios.get("/user/portfolio/"+id);
  },
  createPurchase: function(userData){
    return axios.post("/user/home/wallet", userData);
  },
  // createSell: function(userData){
  //   return axios
  // }
  getCashValue: function(userData){
    return axios.get("/user/home/:id", userData);
  },
  alphaVantageCall: function(){
    return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=SK4M0EMARF3A00VS`)
  },

};
