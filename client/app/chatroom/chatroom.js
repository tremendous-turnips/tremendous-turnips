var chatroom = angular.module('argue.chatroom', [
  'luegg.directives' // scroll-glue directive: https://github.com/Luegg/angularjs-scroll-glue
]);

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
chatroom.controller('chatroomController', function($scope, $location, $http, Chatroom) {
  Chatroom.validateUser(function(result) {
    $scope.myuser = result.data;
  }).then(function() {
    if ($scope.myuser !== '') {
      $scope.roomName = Chatroom.currRoom;
      console.log('this is roomname', $scope.roomName);

      // Set focus to input text field so user doesn't need to click on it to type
      $('.messageTextBox').focus();

      $scope.leaveRoom = function() {
        $location.path('/token');
      };

      $scope.postMessage = function() {
        // Emit a socket event to send the message with the username and text
        var concatMessage = $scope.myuser + ': ' +$scope.userMessage
        socket.emit('chat message', $scope.myuser, $scope.userMessage); // This is a socket, not post request

        // Post requst to server to write to messages table
        Chatroom.postMessage($scope.userMessage, $scope.myuser, 'testChatroom');

        // Clear message text box
        $('.messageList').append($('<li>').text(concatMessage));
        $('.messageTextBox').val('');
      };

      $scope.sendMessage = function() {
        socket.emit('typingMessage', $scope.userMessage);
      };
    } else {
      $location.path('/login');
    }
  })

});
