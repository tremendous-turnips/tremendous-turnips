var services = angular.module('argue.services', []);


services.factory('Logins', function() {
  return {};
});

services.factory('Lobby', function($location) {
  var redirect = function(path) {
    $location.path(path);
  }
  return {
    redirect: redirect
  };
});

services.factory('Chatroom', function() {
  return {};
});

services.factory('Token', function() {
  return {};
});