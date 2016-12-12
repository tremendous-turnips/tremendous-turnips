var db = require('../config.js');

// Gets all rooms from db
module.exports.fetchRooms = function(req, res) {
  db.Chatroom.findAll({})
  .then(function(rooms) {
    res.send(JSON.stringify(rooms));
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

