var services = angular.module('argue.chatroom.services', []);

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

  var postMessage = function(message, user, opponent, chatRoom) {
    return $http({
      method: 'POST',
      url: '/messages',
      data: JSON.stringify({
        text: message,
        user: user,
        chatRoom: chatRoom,
        opponent: opponent
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
    })
  };
  return {
    validateUser: validateUser,
    postMessage: postMessage,
    leaveChatroom: leaveChatroom,
    grabChatrooms: grabChatrooms
  };
});