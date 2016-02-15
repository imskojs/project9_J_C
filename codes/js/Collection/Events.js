(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Events', Events);

  Events.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Events(
    $resource,
    SERVER_URL
  ) {

    var eventUrl = SERVER_URL + '/event' +
      '/:find' +
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:destroy' +
      '/:like' +
      '/:unlike' +
      '/:findLikedEvents';

    var params = {
      find: '@find',
      findOne: '@findOne',
      create: '@create',
      update: '@update',
      destroy: '@destroy',
      like: '@like',
      unlike: '@unlike',
      findLikedEvents: '@findLikedEvents'
    };

    var actions = {

      find: {
        method: 'GET',
        params: {
          find: 'find'
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

      unlike: {
        method: 'POST',
        params: {
          unlike: 'unlike'
        }
      },
      findLikedEvents: {
        method: 'GET',
        params: {
          findOne: 'findLikedEvents'
        }
      },
    };

    var service = $resource(eventUrl, params, actions);

    return service;

  }
})(angular);
