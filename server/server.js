var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 1337;

app.use(express.static('client'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path(__dirname,'client/index.html'));
});

app.get('/lobby', function(req, res) {
  // get chatroom data from database and serve to client
  res.send(JSON.stringify({data: 'placeholder for db fetch'}));
  // NEED TO REQUIRE DB CONNECTION >>>>>>>>>>>>>>>>>>>>>>>>
  // db.Chatroom.findAll()
  //   .then(function(rooms) {
  //     res.status(200).send(rooms);
  //   });
});

////////////////////////////////////////////////////////////////////////////////
// SOCKET.IO
////////////////////////////////////////////////////////////////////////////////
io.on('connection', function (socket) {
  socket.emit('connected', 'you connected to the server!');
  socket.on('typingMessage', function (data) {
    console.log('this is what is getting typed: ', data);
    socket.emit('listeningForMessage', data);
  })
});

app.use(express.static('socket.io'));
////////////////////////////////////////////////////////////////////////////////

server.listen(port, function() {
  console.log('Server running on port', port);
});
