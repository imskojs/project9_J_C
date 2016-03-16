(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Reviews', Reviews);

  Reviews.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Reviews(
    $resource,
    SERVER_URL
  ) {

    var reviewUrl = SERVER_URL + '/review' +
      '/:uri';

    var params = {
      uri: '@uri',
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

      createReview: {
        method: 'POST',
        params: {
          uri: 'createReview'
        }
      },

      updateReview: {
        method: 'PUT',
        params: {
          uri: 'updateReview'
        }
      },

      destroyReview: {
        method: 'DELETE',
        params: {
          uri: 'destroyReview'
        }
      }

    };



    var service = $resource(reviewUrl, params, actions);

    return service;

  }
})(angular);
