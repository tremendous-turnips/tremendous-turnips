var lobby = angular.module('argue.lobby', []);


lobby.controller('lobbyController', function($scope, $location, Lobby) {
  
  $scope.myuser = 'even chang'; // SESSION VARIABLE
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

  // getUsers = function() {
    //Lobby.get
  //}

  $scope.insertUser = function(index, user) {
    console.log('in insertUser');
    $scope.allRooms.rooms[index]['username' + user] = $scope.myuser;
    $location.path('/chatroom');
    //Lobby.post
    //Lobby.get
  };


});