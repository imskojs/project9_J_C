(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Coupons', Coupons);

  Coupons.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Coupons(
    $resource,
    SERVER_URL
  ) {

    var couponUrl = SERVER_URL + '/coupon' +
      '/:find' +
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:updatePassword' +
      '/:use' +
      '/:destroy';

    var params = {
      find: '@find',
      findOne: '@findOne',
      create: '@create',
      update: '@update',
      destroy: '@destroy',
      updatePassword: '@updatePassword',
      use: '@use'
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
      updatePassword: {
        method: 'PUT',
        params: {
          updatePassword: 'updatePassword'
        }
      },
      use: {
        method: 'PUT',
        params: {
          use: 'use'
        }
      },
      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      }
    };

    var service = $resource(couponUrl, params, actions);

    return service;

  }
})(angular);
