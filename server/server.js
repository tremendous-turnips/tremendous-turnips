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
var utils = require('./app/utils.js');

// Environment variables
var port = process.env.PORT || 1337;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'COOKIE'}));
app.use(express.static(__dirname + '/../client'));

////////////////////////////////////////////////////////////////////////////////
// SOCKET.IO
////////////////////////////////////////////////////////////////////////////////
var sockets = require('./sockets.js');
app.use(express.static('socket.io'));
////////////////////////////////////////////////////////////////////////////////

// Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/../client/index.html');
});

app.get('/chatrooms', ChatroomCtrl.fetchRooms);

app.put('/lobby', ChatroomCtrl.updateLobbyRooms);
app.put('/chatrooms', ChatroomCtrl.updateRoomSession);
app.post('/leavechatroom', ChatroomCtrl.leaveChatroom);

app.get('/messages/session-next', MessageCtrl.findNextUniqueSessionID);
app.get('/token', MessageCtrl.findMessageByUsername);
app.post('/messages', MessageCtrl.saveMessage);

app.get('/validLogin', utils.getUsername);
app.post('/users', utils.setUsername);
app.post('/logout', utils.logout);

console.log('Server running on port', port);
server.listen(port, function() {});
