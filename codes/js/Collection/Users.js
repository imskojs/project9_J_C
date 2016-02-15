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
      '/:changePassword';

    var params = {
      login: '@login',
      findOne: '@findOne',
      update: '@update',
      changePassword: '@changePassword'
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
      }
    };

    var service = $resource(postUrl, params, actions);

    service.register = register;
    service.updateMyPageBg = updateMyPageBg;
    service.update = update;

    return service;

    function register(param, query) {
      console.log("---------- Users.register Service Query ----------");
      console.log(query);
      var promise = Photo.post('/user/register', query, 'POST')
        .then(function(dataWrapper) {
          return dataWrapper.data;
        });
      return {
        $promise: promise
      };
    }

    function updateMyPageBg(param, query) {
      var promise = Photo.post('/user/updateMyPageBg', query, 'PUT')
        .then(function(dataWrapper) {
          return dataWrapper.data;
        });
      return {
        $promise: promise
      };
    }

    function update(param, query) {
      var promise = Photo.post('/user/update', query, 'PUT')
        .then(function(dataWrapper) {
          return dataWrapper;
        });
      return {
        $promise: promise
      };
    }

  }
})(angular);
