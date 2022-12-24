//node-fetch is a package that crypto compare API needs
//global.fetch = require("node-fetch"); //<-this method of importing node-fetch didn't work anymore, but found a work around from stack overflow.
const fetch = require("./fetch");

//importing indicators.js where the bundled MA function is housed.
const indicators = require("./indicators.js");

//importing exchange.js, where it house the exchange key, secrets, and api call
const exchange = require("./exchange.js");

/*
//excute an order
//amount->how many tokens to trade, price -> at what price, side -> buy/sell, symbol -> token pair to trade
//response.order_id only prints out the order id instead of the whole transaction.
//order id can be use for other things, such as cancelling order.
restClient.newOrder({amount:10,price:1167,side:"buy",symbol:"ethusd"})
.then(response => console.log(response.order_id))
.catch(error => console.log(error));
*/

/*
//get all token pairs listed in Gemini
restClient.getAllSymbols()
.then(response => console.log(response))
.catch(error => console.log(error));
*/

/*
//get latest price of a ticker
restClient.getTicker("btcusd").then(response => console.log(response))
.then(response => console.log(response))
.catch(error => console.log(error));
*/

/*
//get orderbook (price to bid, amount to bid, when etc. etc.)
restClient.getOrderBook("btcusd")
.then(response => console.log(response))
.catch(error => console.log(error));
*/

/*
//print token list and info
CryptoCompareAPI.coinList()
.then(coinList => {
    console.log(coinList)
})
*/

/*
//display token price at a particular currency, in this case, show btc price in usd and eur
CryptoCompareAPI.price('BTC',['USD','EUR'])
.then(prices => {
    console.log(prices)
})
.catch(console.error)
*/



//calling the function
indicators.minuetMovingAverage("BTC","USD",100,function(result){
    console.log("Minuet MA: "+result);
});

indicators.hourlyMovingAverage("BTC","USD",100,function(result){
    console.log("Hourly MA: "+result);
});

indicators.dailyMovingAverage("BTC","USD",30,function(result){
    console.log("Daily MA:",result)
});

marketBuy("btcusd")
.then(res => console.log(res))
.catch(error =>console.log(error));