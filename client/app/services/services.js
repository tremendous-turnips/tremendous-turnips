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

  var redirect = function(path) {
    $location.path(path);
  }

  var fetchRooms = function(callback) {
    return $http({
      method: 'GET',
      url: '/lobby'
      // data: username
    })
    .then(function (rooms) {
      callback(rooms);
    });
  }

  return {
    validateUser: validateUser,
    redirect: redirect,
    fetchRooms: fetchRooms
  };
});

services.factory('Chatroom', function() {
  return {};
});

services.factory('Token', function() {
  return {};
});