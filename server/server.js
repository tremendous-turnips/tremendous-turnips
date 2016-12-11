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
  db.Chatroom.findAll({})
  .then(function(rooms) {
    res.send(JSON.stringify(rooms));
  })
});

app.put('/lobby', function(req, res) {
  db.Chatroom.find({ where: { roomName: req.body.chatroomName } })
  .then(function(room) {
    if (room) {
      if (req.body.user === 1) {
        room.updateAttributes({
          firstUser: req.body.username,
        })
      } else {
        room.updateAttributes({
          secondUser: req.body.username
        })
      }
      // .success(function () {
      //    console.log('Successfully posted new username into db chatrooms')
      // })
    } else {
      res.send('Error on updating given chatroom name');
    }
  })
  .then(function(room) {
    console.log('Successfully posted new username into db chatrooms');
    res.send(room);
  })

  // .on('success', function (room) {
  //   // Check if record exists in db
  //   if (room) {
  //     room.updateAttributes({
  //       firstUser: 'Firstie',
  //       secondUser: 'Secondie'
  //     })
  //     .success(function () {
  //       console.log('Successfully posted new username into db chatrooms')
  //     })
  //   }
  // })
});

// ROUTE TO DO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.post('/messages', function(req, res) {
  console.log(req.body);
  db.Message.create({
    text: req.body.text,
    user: req.body.user,
    chatroom: req.body.chatRoom
  })
  .then(function() {
    console.log('POSTED TEXT', req.body.text);
    res.send('Some random message: posted to messages route');
  })
})

////////////////////////////////////////////////////////////////////////////////
// SOCKET.IO
////////////////////////////////////////////////////////////////////////////////
var chatroom1 = io.of('/chatroom');

chatroom1.on('connection', function(socket) {
  socket.on('enter', function(username) {
    socket.broadcast.emit('opponent enter', username);
  });
  socket.on('leave', function(username) {
    socket.broadcast.emit('opponent leave', username);
  });
  socket.on('chat message', function(username, message, chatroom) {
    socket.broadcast.emit('posted message', username + ': ' + message);
  });

  socket.on('typing', function(username, msg) {
    socket.broadcast.emit('typing message', username, msg);
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
app.post('/logout', function(req, res) {
  req.session.destroy (function() {
    res.status(200).send('destroyed');
  });
})

console.log('Server running on port', port);
server.listen(port, function() {});
// app.listen(port, function() {
// });
