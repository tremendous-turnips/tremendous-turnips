var lobby = angular.module('argue.lobby', []);


lobby.controller('lobbyController', function($scope, Lobby) {

  //rooms info
    //username1
  $scope.myuser = 'even chang';
  $scope.allRooms = {
    rooms: [
      {
        username1: '_____',
        username2: '_____',
        topic: 'DONALDERINO'
      }, {
        username1: '_____',
        username2: '_____',
        topic: 'somethingelse'
      } 
    ]
  };

  // var insertUsername = function() {
    
  // };


});