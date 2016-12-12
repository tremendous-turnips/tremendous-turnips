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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'COOKIE'}));
app.use(express.static('client'));

app.get('/', function(req, res) {
  res.sendFile(path(__dirname,'client/index.html'));
});

app.get('/lobby', function(req, res) {
  db.Chatroom.findAll({})
  .then(function(rooms) {
    res.send(JSON.stringify(rooms));
  });
});

app.put('/lobby', function(req, res) {
  db.Chatroom.find({ where: { roomName: req.body.chatroomName } })
  .then(function(room) {
    if (room) {
      // Set session variables to be able to delete name after leaving / logging out
      req.session.user = req.body.user;
      req.session.chatroomName = req.body.chatroomName;

      // Update chatroom depending on if entering as user 1 or user 2
      if (req.body.user === 1) {
        room.updateAttributes({
          firstUser: req.body.username,
        });
      } else {
        room.updateAttributes({
          secondUser: req.body.username
        });
      }
    } else {
      res.send('Error on updating given chatroom name');
    }
  })
  .then(function(room) {
    console.log('Successfully posted new username into db chatrooms');
    res.send(room);
  });
});

// ROUTE TO DO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.post('/messages', function(req, res) {
  console.log(req.body.chatRoom);
  db.Message.create({
    text: req.body.text,
    user: req.body.user,
    chatroom: req.body.chatRoom,
    opponent: req.body.opponent,
    session: req.body.session
  })
  .then(function() {
    console.log('POSTED TEXT', req.body.text);
    res.send('Some random message: posted to messages route');
  });
});

app.get('/messages/session-next', function(req, res) {
  db.Message.aggregate('session', 'DISTINCT', {plain: false})
  .then(function(count) {
    var next = count.length + 1;
    res.send(next.toString());
  });
});

////////////////////////////////////////////////////////////////////////////////
// SOCKET.IO
////////////////////////////////////////////////////////////////////////////////

// =============================================================================
// CHATROOM SOCKET
// =============================================================================
var chatroom1 = io.of('/chatroom');

chatroom1.on('connection', function(socket) {
  console.log('chatroom socket open ===============================');
  socket.on('enter', function(username, room) {
    socket.join(room);
    socket.to(room).emit('opponent enter', username);
  });
  socket.on('leave', function(username, room) {
    socket.to(room).emit('opponent leave', username);
    socket.leave(room);
  });
  socket.on('chat message', function(username, message, room) {
    console.log('EMITTING TO...', room);
    socket.to(room).emit('posted message', username + ': ' + message);
  });
  socket.on('typing', function(username, msg, room) {
    // console.log('EMITTING TO...', room);
    socket.to(room).emit('typing message', username, msg);
  });
});

// =============================================================================
// LOBBY SOCKET
// =============================================================================
var lobby1 = io.of('/lobby');

lobby1.on('connection', function(socket) {
  console.log('lobby socket open ===============================');
  // For live updates when another user enters a chatroom
  socket.on('user enters room', function(username, user, roomName) {
    socket.broadcast.emit('other user enters room', username, user, roomName);
  });
  socket.on('user leaves room', function(username, user, roomName) {
    socket.broadcast.emit('other user leaves room', username);
  });
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
