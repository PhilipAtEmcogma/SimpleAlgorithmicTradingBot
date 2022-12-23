//node-fetch is a package that crypto compare API needs
//global.fetch = require("node-fetch"); //<-this method of importing node-fetch didn't work anymore, but found a work around from stack overflow.
const fetch = require("./fetch");
const GeminiAPI=require("gemini-api").default;

//following secret and key are obtained from Gemini sandbox API
//API will be deleted after this project is completed
var secret = "3Bwotuqa9gf7DrQynTBFT9cgQZrV";
var key = "account-clLe7J8K0HBj0o1KTUeu";

//API key from cryptocompare.com account, api will be deleted from the site after this project is completed.
var cryptocompareAPIkey = "32f0dbb35997cc3b5226f29a30a5cfee604ee04fcf47d49e03ecc3dbc548c320";

//initialise restClient, which makes the interaction with Gemini API (a rest API) easier
//restClient is use to ensure it is a valide function request, construct the request and waits for the response
//sandbox:true is to ensure to trade with play money, not real money
const restClient = new GeminiAPI({key,secret,sandbox:true});

//creating crypto compare api client
const CryptoCompareAPI = require("cryptocompare");
CryptoCompareAPI.setApiKey(cryptocompareAPIkey);

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

//build a 100 hour MA strategy as a function
function movingAverage(cryptoAsset,fiatcurrency,hours,callback){

    //get data from crypto compare, unless specified histoHour gives 169 hours by default
    if(hours >169){
        console.log("Only up to 169 hours allowed!");
        return;
    }
    CryptoCompareAPI.histoHour(cryptoAsset,fiatcurrency)
    .then(data => {
        //extract 100 hourly data and calculate the moving average
        data = data.reverse() //without this line, data will start from the data 169 hours ago to the latest one. with this start with the latest one and progress to the oldest one
        var sum = 0;
        for(var i = 0; i<hours; i++){
            sum+=data[i].close;
        }

        var movingAverage = sum/hours;
        callback(movingAverage);
    })
    .catch(console.error)
}

//calling the function
movingAverage("BTC","USD",100,function(result){
    console.log("MA: "+result);
});