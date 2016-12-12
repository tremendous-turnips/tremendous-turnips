var token = angular.module('argue.token', []);


token.controller('tokenController', function($scope, $location, Token, Lobby, Chatroom) {
  Token.validateUser(function(result) {
    $scope.myuser = result.data;
  }).then(function() {
    if ($scope.myuser !== '') {

      $scope.data = {battles: []};

      Token.grabAllBattles($scope.myuser, function(result) {

        $scope.data.battles = result.data;
        console.log(result.data);
      });

      $scope.leaveRoom = function() {
        $location.path('/lobby');
      };

      $scope.chatroom = Chatroom.currRoom;
      $scope.opponent = Chatroom.opponent;

    } else {
      $location.path('/login');
    }
  });
});
