const https = require('https');
const fs = require('fs');
const url = require('url');


https.createServer( function (request, response) {  
   //var pathname = url.parse(request.url).pathname;
   var pathname = request.url ;
   
   console.log("Request for " + pathname + " received.");
   
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{    
         response.writeHead(200, {'Content-Type': 'text/html'});    
         
         response.write(data.toString());       
         request.on('connection',callback);
         function callback(client){
             client.write("say hello");
         }
      }
      response.end();
   });   
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
