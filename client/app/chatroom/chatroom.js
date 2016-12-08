var chatroom = angular.module('argue.chatroom', []);

chatroom.controller('chatroomController', function($scope, $location, Chatroom) {
  Chatroom.validateUser(function(result) {
    $scope.myuser = result.data;
  }).then(function() {
    if ($scope.myuser !== '') {
      var socket = io();

      socket.on('connected', function (data) {
        console.log(data);
      });

      socket.on('listeningForMessage', function (data) {
        $scope.opponentCurrentMessage = data;
      });

      $scope.sendMessage = function() {
        socket.emit('typingMessage', $scope.userMessage);
      }
    } else {
      $location.path('/login');
    }
  })

});
