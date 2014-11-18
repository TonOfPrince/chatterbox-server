/* Import node's http module: */
var http = require("http");
// var handler = require("./request-handler.js")
var express = require("express")
var app = express();
//port
var port = 3000;
//ip
var ip = "127.0.0.1";




var messages = [];

// var defaultCorsHeaders = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10 // Seconds.
// };
// var headers = defaultCorsHeaders;
// headers['Content-Type '] = 'application/JSON';

app.use(function(req, res, next) {
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("access-control-allow-headers", "content-type, accept");
  res.header("access-control-max-age", 10);
  next();
});

app.get('/classes/:room', function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.end(JSON.stringify({results: messages}));
});
app.options('/?order=-createdAt', function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.end(JSON.stringify({results: messages}));
});
app.post('/classes/messages', function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.status(201);
  req.on('data', function(data) {
    messages.push(JSON.parse(data));
  });
  res.end(JSON.stringify({results: messages}));
});

//log where we are listening
console.log("Listening on http://" + ip + ":" + port);

app.listen(port, ip);



