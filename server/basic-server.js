/* Import node's http module: */
var http = require("http");
var handler = require("./request-handler.js")

//port
var port = 3000;
//ip
var ip = "127.0.0.1";

//create our server
var server = http.createServer(handler.requestHandler);

//log where we are listening
console.log("Listening on http://" + ip + ":" + port);

//start listening on port and ip
server.listen(port, ip);

