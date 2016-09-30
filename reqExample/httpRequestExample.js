"use strict" ;
/* use this script to get content of any url 
 taking command :
 node client.js [any url] [port when it needed]
 */


const url_ = require('url');
const fs  = require('fs');
const commandLineArgs = require('command-line-args');
 
const optDef = [
    { name: 'url', alias: 'u', type: String  },
    { name: 'filename', type: String, alias: 'f' },
    { name: 'port', alias: 'p', type: Number }
];
const args = commandLineArgs(optDef);
if (!args.url || !args.filename){
    console.log("You missed to write  url  and or file name ")
         exit();
}
// here we get command line arguments
//var args =  process.argv.slice(2);
//(args.url) ? '' : args[0] = "garbage text"; 
var  hostname_= url_.parse(args['url']).hostname;
console.log(args.url);
console.log(__dirname+"/"+args.filename);
//if (args.url ){
//    //return console.log('script was called with invalid or  without URI') ;
//    process.exit(27);
//}
var  protocol_= url_.parse(args.url).protocol;
if (protocol_ == 'https:'){
    var http_pro = require('https');
} else {
    var http_pro = require('http');
}
var host_ = url_.parse(args.url).hostname;
var path_ = url_.parse(args.url).path;
var port_ = (args.port) ? args.port : '443';
var filename_ = __dirname+"/"+args.filename

const options = {
   host: host_,
   port: port_,
   path: path_ 
};

const callback = function(response){
    var body = '';
    response.on('data', function(data) {
        body += data;
        var myData = body;
        fs.writeFile(filename_, myData , function (err) {
            if (err) return console.log(err);
        });
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
