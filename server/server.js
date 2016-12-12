var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
// Export for sockets
module.exports.server = server;
// var io = require('socket.io')(server);
var db = require('./app/config.js');
var Sequelize = require('sequelize');
var session = require('express-session');

// Controller dependencies
var ChatroomCtrl = require('./app/controllers/chatroom.js');
var MessageCtrl = require('./app/controllers/message.js');
var UserCtrl = require('./app/controllers/user.js');

// Environment variables
var port = process.env.PORT || 1337;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'COOKIE'}));
app.use(express.static(__dirname + '/../client'));

// Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/../client/index.html');
});

app.get('/lobby', ChatroomCtrl.fetchRooms);

app.put('/lobby', ChatroomCtrl.updateLobbyRooms);

app.post('/messages', MessageCtrl.saveMessage);

app.get('/messages/session-next', MessageCtrl.findNextUniqueSessionID);

////////////////////////////////////////////////////////////////////////////////
// SOCKET.IO
////////////////////////////////////////////////////////////////////////////////
var sockets = require('./sockets.js');
app.use(express.static('socket.io'));
////////////////////////////////////////////////////////////////////////////////

app.post('/users', UserCtrl.setUsername);

app.get('/validLogin', function(req, res) {
  res.status('200').send(req.session.username);
});

app.post('/logout', function(req, res) {
  req.session.destroy (function() {
    res.status(200).send('destroyed');
  });
});

app.get('/chatrooms', function(req, res) {
  db.Chatroom.findAll({})
  .then(function(chatrooms) {
    res.send(chatrooms);
  });
});

app.put('/chatrooms', function(req, res) {
  console.log(req.body, "PUT /chatrooms request!")
  db.Chatroom.find({ where: { roomName: req.body.roomName } })
  .then(function(room) {
    room.updateAttributes({
      session: req.body.session
    });
    res.send('Added session to room.');
  });
});

app.post('/leavechatroom', function(req, res) {
  // Remove user from chatroom when leaving
  db.Chatroom.find({ where: { roomName: req.session.chatroomName } })
  .then(function(room) {
    if (room) {
      if (req.session.user === 1) {
        room.updateAttributes({
          firstUser: null,
        });
      } else {
        room.updateAttributes({
          secondUser: null
        });
      }
    } else {
      res.send('Error on updating given chatroom users');
    }
  })
  .then(function(room) {
    console.log('Successfully removed username from db chatroom');
    res.send(room);
  });
});

app.get('/token', function(req, res) {
  db.Message.findAll({where: { user: req.session.username}})
  .then(function(messages) {
    res.send(messages);
  });
});

app.get('/getChatrooms', function(req, res) {
  db.Chatroom.findAll({})
  .then(function(rooms) {
    res.send(rooms);
  })
})

console.log('Server running on port', port);
server.listen(port, function() {});
// app.listen(port, function() {
// });
