(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Banners', Banners);

  Banners.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Banners(
    $resource,
    SERVER_URL
  ) {

    var endPoint = SERVER_URL + '/banner' +
      '/:uri';

    var params = {
      uri: '@uri',
    };

    var actions = {
      findFive: {
        method: 'GET',
        params: {
          uri: 'findFive'
        }
      },
    };

    var service = $resource(endPoint, params, actions);

    return service;

  }
})(angular);
