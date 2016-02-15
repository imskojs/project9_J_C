(function(angular) {
  'use strict';

  angular.module('app')
    .factory('zCouponListModel', zCouponListModel);

  zCouponListModel.$inject = [];

  function zCouponListModel() {

    var Model = {
      loading: true,
      coupons: [{
        id: 10,
        photos: [{
          id: 0,
          url: 'http://placehold.it/400x400'
        }],
        title: '파워퓌트니스',
        content: '휘트니스 한달 이용권 10% 할인',
        expirationDate: new Date(),
        totalQuantity: 20,
        usedQuantity: 15,
        quantity: 5
      }, {
        id: 11,
        photos: [{
          id: 0,
          url: 'http://placehold.it/400x400'
        }],
        title: '파워퓌트니스1',
        content: '휘트니스 한달 이용권 10% 할인 1',
        expirationDate: new Date(),
        totalQuantity: 20,
        usedQuantity: 5,
        quantity: 15
      }]
    };

    return Model;

  }
})(angular);
