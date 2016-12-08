var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = require('./app/config.js');
var Sequelize = require('sequelize');
var session = require('express-session');



var port = process.env.PORT || 1337;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: 'COOKIE'}));
app.use(express.static('client'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path(__dirname,'client/index.html'));
});

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
  req.session.username = req.body.username;
  console.log('got it');
  res.status('200').json(req.session.username);
});

app.get('/validLogin', function(req, res) {
  res.status('200').send(req.session.username);
})
app.get('/logout', function(req, res) {
  req.session.destroy (function() {
    res.status(200).send('destroyed');
  });
})

server.listen(port, function() {});
// app.listen(port, function() {
//   console.log('Server running on port', port);
// });
