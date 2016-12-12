var Promise = require('bluebird');
var db = require('../config.js');

module.exports.fetchRooms = function(req, res) {
  db.Chatroom.findAll({})
  .then(function(rooms) {
    res.send(JSON.stringify(rooms));
  });
};

