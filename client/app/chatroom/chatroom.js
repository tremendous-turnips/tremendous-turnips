var chatroom = angular.module('argue.chatroom', []);

///////////////////////////////////////////////////////////
// Socket.io event listeners
///////////////////////////////////////////////////////////
var socket = io('/chatroom');
// Listens for a new message from the server
socket.on('posted message', function(msg){
  $('.messageList').append($('<li>').text(msg));
});
///////////////////////////////////////////////////////////
// Chatroom Controller
///////////////////////////////////////////////////////////
chatroom.controller('chatroomController', function($scope, $location, Chatroom) {
  Chatroom.validateUser(function(result) {
    $scope.myuser = result.data;
  }).then(function() {
    if ($scope.myuser !== '') {

      $scope.postMessage = function() {
        // submit a post request to the server to send the message
        socket.emit('chat message', $scope.userMessage); // This is a socket, not post request

        // Clear message text box
        $('.messageTextBox').val('');
      };

      $scope.sendMessage = function() {
        socket.emit('typingMessage', $scope.userMessage);
      }
    } else {
      $location.path('/login');
    }
  })

});
