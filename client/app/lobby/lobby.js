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
        var thisScope = $scope;
        Lobby.fetchRooms(function(rooms) {
          thisScope.allRooms.rooms = rooms.data;
          console.log(rooms, 'inside fetchrooms in lobby controller');
        });
      }

      $scope.fetchRooms();

      $scope.insertUser = function(index, user, roomName) {
        console.log(roomName, '.....roomName', typeof roomName);
        // $scope.allRooms.rooms[index]['username' + user] = $scope.myuser;

        Lobby.insertUser($scope.myuser, user, roomName, function(updated) {
          console.log(updated);
          Chatroom.currRoom = roomName;
          $location.path('/chatroom');
        });

        //Lobby.post
        //Lobby.get
      };

      $scope.redirectToToken = function(path) {
        $location.path('/token')
      }

      $scope.logout = function(path) {
        // DESTROY SESSION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        Lobby.logoutUser();
        $location.path('/login')
      }
    } else {
      $location.path('/login')
    }
  })

});
