/* use this script to get content of any url 
 taking command :
 node client.js [any url] [port when it needed]
 */


const url = require('url');
// here we get command line arguments
var args =  process.argv.slice(2);
var  protocol_= url.parse(args[0]).protocol;
if (protocol_ == 'https:'){
    var http_pro = require('https');
} else {
    var http_pro = require('http');
}
var host_ = url.parse(args[0]).hostname;
var path_ = url.parse(args[0]).path;
var port_ = (args[1] == undefined) ? args[1] : '443';

const options = {
   host: host_,
   port: port_,
   path: path_ 
};

const callback = function(response){
   var body = '';
   response.on('data', function(data) {
      body += data;
   });

   response.on('end', function() {
      console.log(body);
   });
}
const req = http_pro.request(options, callback);
req.end();

req.on('error', function(error) {
    console.log(error);
});
