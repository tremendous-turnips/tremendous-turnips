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
  };

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
    });
  };

  var fetchRooms = function(cb) {
    return $http({
      method: 'GET',
      url: '/lobby'
    })
    .then(function (rooms) {
      cb(rooms);
    });
  };

  var logoutUser = function() {
    return $http({
      method: 'POST',
      url: '/logout'
    })
    .then(function() {
      console.log('SUCCESSFULLY LOGGED OUT');
    });
  };

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
    });
  };

  var currRoom = '';
  var opponent = '';

  var getOpponentName = function(myuser, chatRoom, cb) {
    return $http({
      method: 'GET',
      url: '/lobby',
    })
    .then(function (rooms) {
      var opponent = '';
      rooms.data.forEach(function(room) {
        if (chatRoom === room.roomName) {
          if (room.firstUser !== myuser) {
            opponent = room.firstUser;
          } else if (room.secondUser !== myuser){
            opponent = room.secondUser;
          }
        }
      });
      cb(opponent);
    });
  };

  var getSessionName = function(chatRoom, cb) {
    return $http({
      method: 'GET',
      url: '/chatrooms',
    })
    .then(function (chatrooms) {
      var session;
      chatrooms.data.forEach(function(chatroom) {
        if (chatRoom === chatroom.roomName) {
          session = chatroom.session;
        }
      });
      cb(session);
    });
  };

  var createSession = function(roomName, cb) {
    var result = $http({
      method: 'GET',
      url: '/messages/session-next',
    }).then(function(res) {
      cb(res.data);
      $http({
        method: 'PUT',
        url: '/chatrooms',
        data: JSON.stringify({
          roomName: roomName,
          session: res.data,
        })
      });
    });
  };

  var endSession = function() {

  };

  var postMessage = function(message, user, opponent, chatRoom, session) {
    return $http({
      method: 'POST',
      url: '/messages',
      data: JSON.stringify({
        text: message,
        user: user,
        chatRoom: chatRoom,
        opponent: opponent,
        session: session
      })
    })
    .then(function() {
      console.log('SUCCESSFULLY POSTED MESSAGE OUT');
    });
  };

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

  var grabChatrooms = function(cb) {
    return $http({
      method: 'GET',
      url: '/getChatrooms'
    })
    .then(function(chatrooms) {
      cb(chatrooms.data);
    });
  };
  return {
    validateUser: validateUser,
    postMessage: postMessage,
    leaveChatroom: leaveChatroom,
    getOpponentName: getOpponentName,
    getSessionName: getSessionName,
    createSession: createSession,
    endSession: endSession,
    grabChatrooms: grabChatrooms

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
    });
  };

  var grabAllBattles = function(cb) {
    return $http({
      method: 'GET',
      url: '/token'
    })
    .then(function(result) {
      cb(result.data);
    });
  };

  return {
    validateUser: validateUser,
    grabAllBattles: grabAllBattles
  };
});
