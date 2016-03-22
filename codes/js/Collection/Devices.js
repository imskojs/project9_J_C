(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Devices', Devices);

  Devices.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Devices(
    $resource,
    SERVER_URL
  ) {

    var endPoint = SERVER_URL + '/device' +
      '/:uri';

    var params = {
      uri: '@uri',
    };

    var actions = {
      update: {
        method: 'PUT',
        params: {
          uri: 'update'
        }
      },
      pushOff: {
        method: 'PUT',
        params: {
          uri: 'pushOff'
        }
      },
      pushOn: {
        method: 'PUT',
        params: {
          uri: 'pushOn'
        }
      },
    };

    var service = $resource(endPoint, params, actions);

    return service;

  }
})(angular);