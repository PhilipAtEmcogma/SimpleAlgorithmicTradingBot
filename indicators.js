//creating crypto compare api client
const CryptoCompareAPI = require("cryptocompare");
//API key from cryptocompare.com account, api will be deleted from the site after this project is completed.
var cryptocompareAPIkey = "32f0dbb35997cc3b5226f29a30a5cfee604ee04fcf47d49e03ecc3dbc548c320";

CryptoCompareAPI.setApiKey(cryptocompareAPIkey);


//bundling the function into a module
module.exports ={
        hourlyMovingAverage:function (cryptoAsset,fiatcurrency,hours,callback){

        //get data from crypto compare, unless specified histoHour gives 169 hours by default
        if(hours >169){
            console.error("Only up to 169 hours allowed!");
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
}