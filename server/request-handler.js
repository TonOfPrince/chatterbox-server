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
var messages = [];


var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // var myPath = url.parse(request.url).pathname;
  // var fullPath = path.join(process.cwd(), myPath);
  // var results = [];

  var statusCode = 200;

  if (request.url === '/classes/messages' || request.url === '/classes/room1' || request.url === '/?order=-createdAt') {
    if (request.method === 'GET') {
      statusCode = 200;
    } else if (request.method === 'POST') {
      statusCode = 201;
      request.on('data', function(data) {
        messages.push(JSON.parse(data));
      });
    }
  } else {
    statusCode = 404;
  }

  var headers = defaultCorsHeaders;
  headers['Content-Type '] = 'application/JSON';
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify({results: messages}));

};

exports.requestHandler = requestHandler;


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

