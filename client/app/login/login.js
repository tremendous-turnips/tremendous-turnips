var login = angular.module('argue.login', []);


login.controller('loginController', function($scope, Logins) {
  $scope.data = {}
  $scope.submitUsername = function() {
    $scope.data.username = $scope.username;
    Logins.postUsername($scope.data);
  }
})
