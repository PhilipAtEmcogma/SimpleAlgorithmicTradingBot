//creating crypto compare api client
const CryptoCompareAPI = require("cryptocompare");
//API key from cryptocompare.com account, api will be deleted from the site after this project is completed.
var cryptocompareAPIkey = "#";

CryptoCompareAPI.setApiKey(cryptocompareAPIkey);


//bundling the function into a module
module.exports ={
    minuetMovingAverage:function (cryptoAsset,fiatcurrency,minuets, callback){

        //get data from crypto compare, unless specified histoHour gives 169 hours by default
        if(minuets >1440){
            console.error("Only up to 1440 minuets allowed!");
            return;
        }
        CryptoCompareAPI.histoHour(cryptoAsset,fiatcurrency)
        .then(data => {
            //extract hourly data and calculate the moving average
            data = data.reverse() //without this line, data will start from the data 169 hours ago to the latest one. with this start with the latest one and progress to the oldest one
            var sum = 0;
            for(var i = 0; i<minuets; i++){
                sum+=data[i].close;
            }

            var movingAverage = Math.floor(sum/minuets);
            callback(movingAverage);
        })
        .catch(console.error)
    },   

    hourlyMovingAverage:function (cryptoAsset,fiatcurrency,hours, callback){

    //get data from crypto compare, unless specified histoHour gives 169 hours by default
    if(hours >169){
        console.error("Only up to 169 hours allowed!");
        return;
    }
    CryptoCompareAPI.histoHour(cryptoAsset,fiatcurrency)
    .then(data => {
        //extract hourly data and calculate the moving average
        data = data.reverse() //without this line, data will start from the data 169 hours ago to the latest one. with this start with the latest one and progress to the oldest one
        var sum = 0;
        for(var i = 0; i<hours; i++){
            sum+=data[i].close;
        }

        var movingAverage = Math.floor(sum/hours);
        callback(movingAverage);
    })
    .catch(console.error)
}, 

dailyMovingAverage: function (cryptoAsset, fiatcurrency, daily, callback){
    //get data from crypto compare, unless specified histoHour gives 31 days by default
    if(daily >31){
        console.error("Only up to 31 days allowed!");
        return;
    }
    CryptoCompareAPI.histoDay(cryptoAsset,fiatcurrency)
    .then(data => {
        //extract 100 hourly data and calculate the moving average
        data = data.reverse() //without this line, data will start from the data 169 hours ago to the latest one. with this start with the latest one and progress to the oldest one
        var sum = 0;
        for(var i = 0; i<daily; i++){
            sum+=data[i].close;
        }

        var movingAverage = Math.floor(sum/daily);
        callback(movingAverage);
    })
    .catch(console.error)
    } 
}
