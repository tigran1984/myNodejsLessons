const https = require('https');

const options = {
   host: 'www.bitstamp.net',
   port: '443',
   path: "/api/v2/order_book/btcusd/" 
};

//const callback = function(error, response){
const callback = function(response){
   //if (error){
   //    console.log(error);
   //}
   var body = '';
   response.on('data', function(data) {
      body += data;
   });

   response.on('end', function() {
      console.log(body);
   });
}
const req = https.request(options, callback);
req.end();
