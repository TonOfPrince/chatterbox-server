/* Import node's http module: */
var http = require("http");
// var handler = require("./request-handler.js")
var express = require("express")
//port
var port = 3000;
//ip
var ip = "127.0.0.1";

var app = express();

var messages = [];

app.get('/classes/messages', function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.send(JSON.stringify({results: messages}));
});
app.post('/classes/messages', function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.status(201);
  req.on('data', function(data) {
    messages.push(JSON.parse(data));
  });
  res.send(JSON.stringify({results: messages}));
});
app.get('/classes/room1', function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.send(JSON.stringify({results: messages}));

});
app.post('/classes/room1', function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.status(201);
  res.send(JSON.stringify({results: messages}));
})

//log where we are listening
console.log("Listening on http://" + ip + ":" + port);

app.listen(port, ip);



