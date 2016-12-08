var token = angular.module('argue.token', []);


token.controller('tokenController', function($scope, $location, Token) {
  Token.validateUser(function(result) {
    $scope.myuser = result.data;
  }).then(function() {
    if ($scope.myuser !== '') {

    } else {
      $location.path('/login');
    }
  });
})
