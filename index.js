//node-fetch is a package that crypto compare API needs
//global.fetch = require("node-fetch"); //<-this method of importing node-fetch didn't work anymore, but found a work around from stack overflow.
const fetch = require("./fetch");

//importing indicators.js where the bundled MA function is housed.
const indicators = require("./indicators.js");

//importing exchange.js, where it house the exchange key, secrets, and api call
const exchange = require("./exchange.js");

var hasPosition = false; //flag for indiciating is there a trade opened

var strategy = function(){
    //if BTC < MA -> buy (if there's no existing position)

    //if BTC > MA -> sell (if there's a existing position)


    console.log("\n");
    console.log("==========================================");
    console.log("Executing strategy");

    indicators.hourlyMovingAverage("BTC","USD",100,function(ma){
        exchange.bitconPrice()
        .then(res => {
            var price = res.last; //only interest in the latest closing price       

            console.log("MA: ",ma);
            consolg.log("Price: ", price);

            if(price < ma && !hasPosition){

                console.log("BUY SIGNAL!");
                exchange.marketBuyBTC()
                .then(res =>{
                    console.log("Buy successful");
                    hasPosition = true;

                    setTimeout(strategy,1000);//time out 1s when successfully brought before calling strategy again
                })
                .catch(error => console.error);
            }

            else if(price > ma && hasPosition){
                console.log("SELL SIGNAL");
                exchange.marketSellBTC()
                .then(res =>{
                    console.log("Sell successful");
                    hasPosition = false;

                    setTimeout(strategy, 1000); //timeout 1s after successfully sold before call strategy again
                })
            }

            else{
                console.log("HODL");
                setTimeout(strategy, 1000);
            }

 
        })
    });



}

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


/*
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

marketBuyBTC()
.then(res => console.log(res))
.catch(error =>console.log(error));
*/