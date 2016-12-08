var services = angular.module('argue.services', []);
var baseUrl = 'http://127.0.0.1:1337';

services.factory('Logins', function() {
  return {};
});

services.factory('Lobby', function($location) {
  var redirect = function(path) {
    $location.path(path);
  }
  
  var fetchRooms = function(callback) {
    
    // PLACEHOLDER AJAX CALL, EXPECTS "{data: 'somedata'}"
    $.ajax({
      url: baseUrl + '/lobby',
      type: 'GET',
      contentType: 'application/json',
      success: function(rooms) {
        console.log('successful get');
        callback(JSON.parse(rooms).data);
      },
      error: function(err) {
        console.log(baseUrl + '/lobby')
        console.log('Fetch to server got cucked');
      }
    });
  }

  return {
    redirect: redirect,
    fetchRooms: fetchRooms
  };
});

services.factory('Chatroom', function() {
  return {};
});

services.factory('Token', function() {
  return {};
});