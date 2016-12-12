var db = require('../config.js');

module.exports.setUsername = function(req, res) {
  req.session.username = req.body.username;
  console.log('got it');
  res.status('200').json(req.session.username);
};