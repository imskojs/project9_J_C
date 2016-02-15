(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Places', Places);

  Places.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Places(
    $resource,
    SERVER_URL
  ) {

    var placeUrl = SERVER_URL + '/place' +
      '/:find' +
      '/:findLikedPlaces' +
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:destroy' +
      '/:like' +

      '/:findNative' +
      '/:contactOwner';

    var params = {
      find: '@find',
      findLikedPlaces: '@findLikedPlaces',
      findOne: '@findOne',
      create: '@create',
      update: '@update',
      destroy: '@destroy',
      like: '@like',

      findNative: '@findNative',
      contactOwner: '@contactOwner'
    };

    var actions = {

      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },

      findLikedPlaces: {
        method: 'GET',
        params: {
          findLikedPlaces: 'findLikedPlaces'
        }
      },

      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },

      create: {
        method: 'POST',
        params: {
          create: 'create'
        }
      },

      update: {
        method: 'PUT',
        params: {
          update: 'update'
        }
      },

      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      },

      like: {
        method: 'POST',
        params: {
          like: 'like'
        }
      },

      // longitude, latitude, distance
      findNative: {
        method: 'GET',
        params: {
          findNative: 'findNative'
        }
      },

      contactOwner: {
        method: 'POST',
        params: {
          contactOwner: 'contactOwner'
        }
      }

    };

    var service = $resource(placeUrl, params, actions);

    return service;

  }
})(angular);
