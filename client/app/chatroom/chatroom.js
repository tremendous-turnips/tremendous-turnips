var chatroom = angular.module('argue.chatroom', []);

chatroom.controller('chatroomController', ['$scope', function($scope, Chatroom) {
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

}]);
