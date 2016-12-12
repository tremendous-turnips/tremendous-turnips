var db = require('../config.js');

// Gets all rooms from db
module.exports.fetchRooms = function(req, res) {
  db.Chatroom.findAll({})
  .then(function(rooms) {
    res.send(rooms);
  });
};

// Updated occupants in rooms in Lobby view
module.exports.updateLobbyRooms = function(req, res) {
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
};

// Update room session
module.exports.updateRoomSession = function(req, res) {
  console.log(req.body, "PUT /chatrooms request!")
  db.Chatroom.find({ where: { roomName: req.body.roomName } })
  .then(function(room) {
    room.updateAttributes({
      session: req.body.session
    });
    res.send('Added session to room.');
  });
};

// Remove user from chatroom in DB when leaving
module.exports.leaveChatroom = function(req, res) {
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
};