const GeminiAPI=require("gemini-api").default;

//initialise restClient, which makes the interaction with Gemini API (a rest API) easier
//restClient is use to ensure it is a valide function request, construct the request and waits for the response
//sandbox:true is to ensure to trade with play money, not real money
const restClient = new GeminiAPI({key,secret,sandbox:true});

//following secret and key are obtained from Gemini sandbox API
//API will be deleted after this project is completed
var secret = "3Bwotuqa9gf7DrQynTBFT9cgQZrV";
var key = "account-clLe7J8K0HBj0o1KTUeu";

module.exports = {
    marketBuyBTC:function(){
        //Gemini API doesn't support market buy, but have a very aggressive limit buy price
        //i.e. a number very high limit buy above for buy, and a number very low limit sell below for sell,
        //it arguably achieve market buy/sell
        restClient.newOrder({
            amount:1,
            price:100000,
            side:"buy",
            symbol: btcusd,
            options:["immediate-or-cancel"]})    
    },

    marketSellBTC:function(){
                //Gemini API doesn't support market buy, but have a very aggressive limit buy price
        //i.e. a number very high limit buy above for buy, and a number very low limit sell below for sell,
        //it arguably achieve market buy/sell
        restClient.newOrder({
            amount:1,
            price:1,
            side:"sell",
            symbol: btcusd,
            options:["immediate-or-cancel"]})  
    },

    bitconPrice:function(){
        return restClient.getTicker("btcusd");
    }
}