var path = require('path');
var express = require('express');
var app = express();

var port = process.env.PORT || 1337;

app.use(express.static('client'));

app.get('/', function(req, res) {
  res.sendFile(path(__dirname,'client/index.html'));
});

app.listen(port, function() {
  console.log('Server running on port', port);
});