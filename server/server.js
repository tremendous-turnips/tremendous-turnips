var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = require('./app/config.js');
var Sequelize = require('sequelize');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 1337;

app.use(express.static('client'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path(__dirname,'client/index.html'));
});

var exampleRoomData = {
  rooms: [
    {
      firstUser: '_____',
      secondUser: '_____',
      roomName: 'DONALDERINO'
    }, {
      firstUser: '_____',
      secondUser: '_____',
      roomName: 'somethingelse'
    } 
  ]
};

app.get('/lobby', function(req, res) {
  db.Chatroom.findAll()
  .then(function(rooms) {
    res.send(JSON.stringify(rooms));
  })
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

app.post('/users', function(req, res) {
  console.log('GOT USER', req.body.username);
  res.status('200').json(req.body);
});

server.listen(port, function() {});
// app.listen(port, function() {
//   console.log('Server running on port', port);
// });
