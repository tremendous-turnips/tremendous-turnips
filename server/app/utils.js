module.exports.setUsername = function(req, res) {
  req.session.username = req.body.username;
  res.status('200').json(req.session.username);
};

module.exports.getUsername = function(req, res) {
  res.status('200').send(req.session.username);
}; 

module.exports.logout = function(req, res) {
  req.session.destroy (function() {
    res.status(200).send('destroyed');
  });
};