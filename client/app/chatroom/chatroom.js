var chatroom = angular.module('argue.chatroom', [
  'luegg.directives' // scroll-glue directive: https://github.com/Luegg/angularjs-scroll-glue
]);

var socket = io('/chatroom');
var lobbySocket = io('/lobby');

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

      // Set default oppenent is typing message to not show
      $('.userIsTyping').hide();

      ///////////////////////////////////////////////////////////
      // Socket.io event listeners
      ///////////////////////////////////////////////////////////
      // Remove all listeners on socket
      socket.removeAllListeners();

      // Listen for when opponent enters the room
      socket.on('opponent enter', function(username){
        $('.messageList').append($('<li class="chatNotifications">').text(username + ' has entered the room.'));
        Chatroom.opponent = username;
      });
      socket.on('opponent leave', function(username){
        $('.messageList').append($('<li class="chatNotifications">').text(username + ' has left the room.'));
        Chatroom.opponent = '';
      });
      // Listens for a new message from the server
      socket.on('posted message', function(msg){
        $('.messageList').append($('<li>').text(msg));
      });

      // Listens for another user is typing
      socket.on('typing message', function(username, msg) {
        // var opponentTyping = username + ' is typing...'; // Better UI
        $scope.opponent = username;
        var opponentTyping = username + ': ' + msg; // SHOWS FULL CAPACITY OF WEB SOCKETS!!!
        var element = '<div class="userIsTyping chatNotifications">' + opponentTyping + '</div>';
        if (msg !== '') {
          $('.userIsTyping').replaceWith(element);
          $('.userIsTyping').show();
        }
        if (msg === '') {
          $('.userIsTyping').hide();
        }

        // setTimeout(function() {
        //   $('.userIsTyping').hide();
        // }, 3000);
      });
      ///////////////////////////////////////////////////////////
      $scope.enterRoom = function() {
        socket.emit('enter', $scope.myuser);
      };
      $scope.enterRoom();

      $scope.leaveRoom = function() {
        // Update db for user leaving chatroom
        Chatroom.leaveChatroom(function() { lobbySocket.emit('user leaves room') });

        $location.path('/token');
        socket.emit('leave', $scope.myuser);
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

      $scope.showTyping = function() {
        socket.emit('typing', $scope.myuser, $scope.userMessage);
      };
    } else {
      $location.path('/login');
    }
  })

});
