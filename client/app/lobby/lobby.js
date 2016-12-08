var lobby = angular.module('argue.lobby', []);


lobby.controller('lobbyController', function($scope, $location, Lobby) {
  
  $scope.myuser = 'even chang'; // SESSION VARIABLE
  $scope.allRooms = {
    rooms: [
      {
        firstUser: '_____',
        secondUser: '_____',
        roomName: 'DONALDERINO'
      }, {
        firstUser: '_____',
        secondUser: '_____',
        roomName: 'somethingelse'
      } 
    ]
  };

  $scope.exampleRoomData = {
  rooms: [
    {
      firstUser: '_____',
      secondUser: '_____',
      roomName: 'DONALDERINO'
    }, {
      firstUser: '_____',
      secondUser: '_____',
      roomName: 'somethingelse'
    } 
  ]
};

  $scope.fetchRooms = function() {
    var thisScope = $scope;
    Lobby.fetchRooms(function(rooms) {
      thisScope.allRooms.rooms = $scope.exampleRoomData.rooms;
      console.log(rooms);
    });
  }

  $scope.fetchRooms();

  $scope.insertUser = function(index, user) {
    console.log('in insertUser');
    $scope.allRooms.rooms[index]['username' + user] = $scope.myuser;
    $location.path('/chatroom');
    //Lobby.post
    //Lobby.get
  };

  $scope.redirectToToken = function(path) {
    Lobby.redirect(path);
  }

  $scope.logout = function(path) {

    // DESTROY SESSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    Lobby.redirect(path);
  }

});