/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var http = require("http");
// var path = require("path");
// var url = require("url");

var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);
  console.log(request.ondata);

  // var myPath = url.parse(request.url).pathname;
  // var fullPath = path.join(process.cwd(), myPath);
  var results = [];
  results.push('apples');

  var statusCode = 200;

  if (request.url === '/classes/messages' || request.url === '/classes/room1') {
    if (request.method === 'GET') {
      statusCode = 200;
      results.push('get');
    } else if (request.method === 'POST') {
      statusCode = 201;
      results.push('post');
    }
  } else {
    statusCode = 404;
    results.push('error');
  }


  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/JSON";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);


  response.end(JSON.stringify({results: results}));
};

exports.requestHandler = requestHandler;


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

