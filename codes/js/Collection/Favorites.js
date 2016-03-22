(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Favorites', Favorites);

  Favorites.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Favorites(
    $resource,
    SERVER_URL
  ) {
    var url = SERVER_URL + '/favorite/:uri';

    var params = { uri: '@uri' };

    var actions = {
      find: {
        method: 'GET',
        params: {
          uri: 'find'
        }
      },

      createPlace: {
        method: 'POST',
        params: {
          uri: 'createPlace'
        }
      },

      update: {
        method: 'PUT',
        params: {
          uri: 'update'
        }
      },

      destroy: {
        method: 'DELETE',
        params: {
          uri: 'destroy'
        }
      }
    };

    return $resource(url, params, actions);
  }

})(angular);
