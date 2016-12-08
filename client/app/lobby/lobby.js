var lobby = angular.module('argue.lobby', []);


lobby.controller('lobbyController', function($scope, $location, Lobby) {
  Lobby.validateUser(function(result) {
    $scope.myuser = result.data;
  }).then(function() {
    console.log($scope.myuser);
    if ($scope.myuser !== '') {
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

      $scope.fetchRooms = function() {
        var thisScope = $scope;
        Lobby.fetchRooms(function(rooms) {
          thisScope.allRooms.rooms = rooms;
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
    } else {
      Lobby.redirect('/login');
    }
  })

});