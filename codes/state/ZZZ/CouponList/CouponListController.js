(function(angular) {
  'use strict';
  angular.module('app')
    .controller('zCouponListController', zCouponListController);

  zCouponListController.$inject = [
    '$scope', '$state', '$q',
    'zCouponListModel', 'Coupons', 'Message', 'U'
  ];

  function zCouponListController(
    $scope, $state, $q,
    zCouponListModel, Coupons, Message, U
  ) {
    var initPromise;
    var noLoadingStates = [
      'Main.zCouponDetail'
    ];
    var CouponList = this;
    CouponList.Model = zCouponListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    CouponList.refresh = refresh;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        U.loading(zCouponListModel);
        initPromise = init();
      } else {
        U.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return initPromise
          .then(function(couponsWrapper) {
            U.bindData(couponsWrapper, zCouponListModel, 'coupons');
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {}
    }

    //====================================================
    //  Implementation
    //====================================================
    function refresh() {
      return init()
        .then(function(couponsWrapper) {
          U.bindData(couponsWrapper, zCouponListModel, 'coupons');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return couponFind();
    }

    //====================================================
    // REST 
    //====================================================
    function couponFind(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            place: $state.params.id,
            // quantity: {
            //   '>': 0
            // }
          },
          populates: ['photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Coupons
        .find(queryWrapper).$promise
        .then(function(couponsWrapper) {
          return couponsWrapper;
        });
    }

  } //end
})(angular);
