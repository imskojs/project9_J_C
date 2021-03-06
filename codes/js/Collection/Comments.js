(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Comments', Comments);

  Comments.$inject = [
    '$resource',
    'SERVER_URL', 'Photo'
  ];

  function Comments(
    $resource,
    SERVER_URL, Photo
  ) {

    var commentUrl = SERVER_URL + '/comment' +
     '/:uri';
    var params = {
      uri: '@uri'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          uri: 'find'
        }
      },
      findOne: {
        method: 'GET',
        params: {
          uri: 'findOne'
        }
      },
      createComment: {
        method: 'POST',
        params: {
          uri: 'createComment'
        }
      },
      updateComment: {
        method: 'PUT',
        params: {
          uri: 'updateComment'
        }
      },
      destroyComment: {
        method: 'DELETE',
        params: {
          uri: 'destroyComment'
        }
      }
    };


    var service = $resource(commentUrl, params, actions);

    return service;

  }
})(angular);
