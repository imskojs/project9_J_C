(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Products', Products);

  Products.$inject = [
    '$resource',
    'SERVER_URL', 'Photo'
  ]

  function Products(
      $resource,
      SERVER_URL, Photo
    ) {

    var productUrl = SERVER_URL + '/product' +
      '/:uri';

    var params = {
      'uri': '@uri'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          uri: 'find',
        }
      }
    };

    var service = $resource(productUrl, params, actions);

    return service;
  }
})(angular);