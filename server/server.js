var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 1337;

app.use(express.static('client'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path(__dirname,'client/index.html'));
});

app.get('/lobby', function(req, res) {
  // get chatroom data from database and serve to client
  res.send('placeholder for db fetch');
  // NEED TO REQUIRE DB CONNECTION >>>>>>>>>>>>>>>>>>>>>>>>   
  // db.Chatroom.findAll()
  //   .then(function(rooms) {
  //     res.status(200).send(rooms);
  //   });
});

app.listen(port, function() {
  console.log('Server running on port', port);
});