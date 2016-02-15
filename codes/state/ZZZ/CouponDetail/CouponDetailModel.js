(function(angular) {
  'use strict';

  angular.module('app')
    .factory('zCouponDetailModel', zCouponDetailModel);

  zCouponDetailModel.$inject = [];

  function zCouponDetailModel() {

    var model = {
      loading: false,
      coupon: {},
      form: {
        password: ''
      }
    };

    return model;
  }
})(angular);
