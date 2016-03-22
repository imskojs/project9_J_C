(function(angular) {
  'use strict';
  angular.module('app')
    .controller('zCouponDetailController', zCouponDetailController);

  zCouponDetailController.$inject = [
    '$scope', '$ionicModal', '$state', '$q',
    'zCouponDetailModel', 'Coupons', 'Util', 'AppStorage', 'Message'
  ];

  function zCouponDetailController(
    $scope, $ionicModal, $state, $q,
    zCouponDetailModel, Coupons, Util, AppStorage, Message
  ) {

    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var CouponDetail = this;
    CouponDetail.Model = zCouponDetailModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('modal.hidden', function() {
      zCouponDetailModel.form.password = '';
    });

    CouponDetail.closeModal = closeModal;
    CouponDetail.useCoupon = useCoupon; // from modal
    CouponDetail.getCurrentDate = getCurrentDate; // from modal

    //====================================================
    // View Event
    //====================================================
    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(zCouponDetailModel);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!CouponDetail.modal) {
        createModal();
      }
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(coupon) {
            Util.bindData(coupon, zCouponDetailModel, 'coupon');
          })
          .catch(function(err) {
            Util.error(err);
          });
      } else {}
    }

    //====================================================
    //  Implementation
    //====================================================

    function closeModal() {
      CouponDetail.modal.hide();
    }

    function getCurrentDate() {
      return new Date();
    }

    function useCoupon() {
      Message.loading();
      return couponUse()
        .then(function() {
          CouponDetail.modal.hide();
          Message.alert('쿠폰사용 알림', '쿠폰을 성공적으로 사용하였습니다.');
        })
        .catch(function(err) {
          CouponDetail.modal.hide();
          if (err.data.message[0] === '0') {
            return Message.alert('쿠폰사용 알림', '전부 사용한 쿠폰입니다.');
          }
        })
        .finally(function() {
          CouponDetail.modal.hide();
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return couponFindOne();
    }

    function createModal() {
      return $ionicModal.fromTemplateUrl('state/ZZZ/CouponDetail/Modal/CouponModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        CouponDetail.modal = modal;
      });
    }

    //====================================================
    //  REST
    //====================================================
    function couponFindOne(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          },
          populate: ['photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Coupons
        .findOne(queryWrapper).$promise
        .then(function(coupon) {
          return coupon;
        });
    }

    function couponUse() {
      var queryWrapper = {
        query: {
          id: $state.params.id,
          password: zCouponDetailModel.form.password,
          usedBy: AppStorage.user.id
        }
      };
      return Coupons
        .use(queryWrapper).$promise
        .then(function(updatedCoupon) {
          return updatedCoupon;
        });
    }

  }
})(angular);