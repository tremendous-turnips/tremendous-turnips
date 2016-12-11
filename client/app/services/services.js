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

  var fetchRooms = function(cb) {
    return $http({
      method: 'GET',
      url: '/lobby'
    })
    .then(function (rooms) {
      cb(rooms);
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

  var insertUser = function(username, user, roomName, cb) {
    return $http({
      method: 'PUT',
      url: '/lobby',
      data: JSON.stringify({
        chatroomName: roomName,
        username: username,
        user: user
      })
    })
    .then(function (updatedRoom) {
      cb(updatedRoom);
    });
  };


  return {
    validateUser: validateUser,
    fetchRooms: fetchRooms,
    logoutUser: logoutUser,
    insertUser: insertUser
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

  var currRoom = '';
  var opponent = '';

  var postMessage = function(message, user, chatRoom) {
    return $http({
      method: 'POST',
      url: '/messages',
      data: JSON.stringify({
        text: message,
        user: user,
        chatRoom: chatRoom
      })
    })
    .then(function() {
      console.log('SUCCESSFULLY POSTED MESSAGE OUT');
    });
  }

  var leaveChatroom = function(cb) {
    return $http({
      method: 'POST',
      url: '/leavechatroom'
    })
    .then(function() {
      console.log('Successfully left chatroom');
      if (cb) {
        cb();
      }
    });
  };

  return {
    validateUser: validateUser,
    postMessage: postMessage,
    leaveChatroom: leaveChatroom
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
