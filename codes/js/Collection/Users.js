(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Users', Users);

  Users.$inject = [
    '$resource',
    'Photo',
    'SERVER_URL'
  ];

  function Users(
    $resource,
    Photo,
    SERVER_URL
  ) {

    var postUrl = SERVER_URL + '/user' +
      '/:login' +
      '/:findOne' +
      '/:update' +
      '/:changePassword' +
      '/:sendEmail';

    var params = {
      login: '@login',
      findOne: '@findOne',
      update: '@update',
      changePassword: '@changePassword',
      sendEmail: '@sendEmail'
    };

    var actions = {
      login: {
        method: 'POST',
        params: {
          login: 'login'
        }
      },

      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },

      update: {
        method: 'PUT',
        params: {
          update: 'update'
        }
      },

      changePassword: {
        method: 'POST',
        params: {
          changePassword: 'changePassword'
        }
      },

      sendEmail: {
        method: 'POST',
        params: {
          sendEmail: 'sendEmail'
        }
      }
    };

    var service = $resource(postUrl, params, actions);

    return service;


  }
})(angular);