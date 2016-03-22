(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Messages', Messages);

  Messages.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Messages(
    $resource,
    SERVER_URL
  ) {

    var reviewUrl = SERVER_URL + '/message' +
      '/:uri';

    var params = {
      uri: '@uri',
    };

    var actions = {

      create: {
        method: 'POST',
        params: {
          uri: 'create'
        }
      },

      find: {
        method: 'GET',
        params: {
          uri: 'find'
        }
      },

      findUnique: {
        method: 'GET',
        params: {
          uri: 'findUnique'
        }
      },

      destroy: {
        method: 'DELETE',
        params: {
          uri: 'destroy'
        }
      }
    };

    var service = $resource(reviewUrl, params, actions);

    return service;

  }
})(angular);
