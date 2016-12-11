var lobby = angular.module('argue.lobby', []);


lobby.controller('lobbyController', function($scope, $location, Lobby, Chatroom) {
  Lobby.validateUser(function(result) {
    $scope.myuser = result.data;
  }).then(function() {
    if ($scope.myuser !== '') {
      $scope.allRooms = {
        rooms: []
      };

      $scope.fetchRooms = function() {
        Lobby.fetchRooms(function(rooms) {
          $scope.allRooms.rooms = rooms.data;
          console.log(rooms, 'inside fetchrooms in lobby controller');
        });
      }

      $scope.fetchRooms();

      $scope.insertUser = function(index, user, roomName) {
        console.log(roomName, '.....roomName', typeof roomName);

        Lobby.insertUser($scope.myuser, user, roomName, function(updated) {
          console.log(updated);
          Chatroom.currRoom = roomName;
          $location.path('/chatroom');
        });
      };

      $scope.redirectToToken = function(path) {
        $location.path('/token')
      }

      $scope.logout = function(path) {
        // Destroy session
        Lobby.logoutUser();
        $location.path('/login')
      }
    } else {
      $location.path('/login')
    }
  })

});
