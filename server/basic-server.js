/* Import node's http module: */
// var handler = require("./request-handler.js")
// var http = require("http");
var express = require("express")
var app = express();
//port
var port = 3000;
//ip
var ip = "127.0.0.1";

var objectId = 1;
var messages = [{
  'username': 'Jono',
  'text' : 'Do my bidding!',
  'message' : 'Do my bidding!',
  'roomname': 'lobby',
  'objectId': objectId
}];

app.use(function(req, res, next) {
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("access-control-allow-headers", "content-type, accept");
  res.header("access-control-max-age", 10);
  res.header("content-type", "application/json")
  next();
});


app.get('/classes/:room', function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.end(JSON.stringify({results: messages}));
});
app.post('/classes/:room', function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.status(201);
  var data = "";
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    data = JSON.parse(data);
    data['objectId'] = objectId++;
    messages.push(data);
    res.end(JSON.stringify({results: messages}));
  });
});

//log where we are listening
console.log("Listening on http://" + ip + ":" + port);

app.listen(port, ip);



