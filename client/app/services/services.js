var services = angular.module('argue.services', []);
var baseUrl = 'http://127.0.0.1:1337';

services.factory('Logins', function($http) {
  var postUsername = function(username) {
    return $http({
      method: 'POST',
      url: '/users',
      data: username
    })
    .then(function (resp) {
      return resp;
    });
  }

  return {
    postUsername: postUsername
  };
});

services.factory('Lobby', function($location, $http) {


  var validateUser = function(cb) {
    return $http({
      method: 'GET',
      url: '/validLogin'
    })
    .then(function(result) {
      cb(result);
    })
  }

  var fetchRooms = function(callback) {
    return $http({
      method: 'GET',
      url: '/lobby'
    })
    .then(function (rooms) {
      callback(rooms);
    });
  }

  var logoutUser = function() {
    return $http({
      method: 'POST',
      url: '/logout'
    })
    .then(function() {
      console.log('SUCCESSFULLY LOGGED OUT');
    });
  }

  return {
    validateUser: validateUser,
    fetchRooms: fetchRooms,
    logoutUser: logoutUser
  };
});

services.factory('Chatroom', function($http) {
  var validateUser = function(cb) {
    return $http({
      method: 'GET',
      url: '/validLogin'
    })
    .then(function(result) {
      cb(result);
    })
  }


  return {
    validateUser: validateUser
  };
});

services.factory('Token', function($http) {
    var validateUser = function(cb) {
    return $http({
      method: 'GET',
      url: '/validLogin'
    })
    .then(function(result) {
      cb(result);
    })
  }
  return {
    validateUser: validateUser
  };
});