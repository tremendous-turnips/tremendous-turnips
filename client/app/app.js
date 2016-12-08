angular.module('argue', [
    'argue.services',
    'argue.login',
    'ngRoute'
  ])
  .config(function($routeProvider, $httpProvider) {
    console.log('shit');
    $routeProvider
    .when('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'loginController'
    })
    .when('/lobby', {
      templateUrl: 'app/lobby/lobby.html',
      controller: 'lobbyController'
    })
  });
  


