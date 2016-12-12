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

      //ADDED A GRAB CHATROOM FUNCTION IN SERVICES
      // $scope.data = {roomTracker: []};
      // Chatroom.grabChatrooms(function(rooms){
      //   rooms.forEach(function(roomData) {
      //     var room = roomData.room_name;
      //     var roomUsers = 0;
      //     if (roomData.first_user !== null) {
      //       roomUsers++;
      //     }
      //     if (roomData.second_user !== null) {
      //       roomUsers++;
      //     }
      //     $scope.data.roomTracker.push({
      //       room: roomUsers
      //     });
      //   });
      // })
      // .then(function() {
      $scope.roomName = Chatroom.currRoom;

      Chatroom.opponentName($scope.myuser, $scope.roomName, function(opponent) {
        if (!opponent) {
          $('.messageList').append($('<li class="chatNotifications">').text('You are the first to enter the arena.'));
          $scope.opponent = null;
        } else {
          $('.messageList').append($('<li class="chatNotifications">').text('Your opponent is ' + opponent));
          $scope.opponent = opponent;
        }
      });


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
        $('.messageList').append($('<li class="chatNotifications">').text(username + ' has entered the arena.'));
        Chatroom.opponent = username;
        Chatroom.createSession(function(session) {
          $scope.session = session;
          console.log('The new session is: ', session);
        });
      });
      socket.on('opponent leave', function(username){
        $('.messageList').append($('<li class="chatNotifications">').text(username + ' has left the arena.'));
        Chatroom.opponent = '';
      });
      // Listens for a new message from the server
      socket.on('posted message', function(msg){
        $('.messageList').append($('<li>').text(msg));
      });

      // Listens for another user is typing
      socket.on('typing message', function(username, msg) {
        // var opponentTyping = username + ' is typing...'; // Better UI
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
        socket.emit('enter', $scope.myuser, $scope.roomName);
      };
      $scope.enterRoom();

      $scope.leaveRoom = function() {
        // Update db for user leaving chatroom
        Chatroom.leaveChatroom(function() { lobbySocket.emit('user leaves room');});

        $location.path('/token');
        socket.emit('leave', $scope.myuser, $scope.roomName);
      };

      $scope.postMessage = function() {
        // Emit a socket event to send the message with the username and text
        var concatMessage = $scope.myuser + ': ' +$scope.userMessage;
        socket.emit('chat message', $scope.myuser, $scope.userMessage); // This is a socket, not post request

        // Post requst to server to write to messages table
        Chatroom.postMessage($scope.userMessage, $scope.myuser, $scope.opponent, $scope.roomName, $scope.session);

        // Clear message text box
        $('.messageList').append($('<li>').text(concatMessage));
        $('.messageTextBox').val('');
      };

      $scope.showTyping = function() {
        socket.emit('typing', $scope.myuser, $scope.userMessage, $scope.roomName);
      };
      // })
    } else {
      $location.path('/login');
    }
  });

});
