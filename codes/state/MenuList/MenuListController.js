(function() {
  'use strict';
  angular.module('app')
    .controller('MenuListController', MenuListController);

  MenuListController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$state',
    'MenuListModel', 'Util', 'Products'
  ];

  function MenuListController(
    _MockData,
    $ionicHistory, $scope, $state,
    MenuListModel, Util, Products
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = MenuListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(MenuListModel);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
      console.log("$state.params :::\n", $state.params);
    }

    function onAfterEnter() {
      initPromise
        .then(productsWrapper => { //{id: 1300, name: 'asda' ... }
          Util.bindData(productsWrapper, MenuListModel, 'products'); //Model['place'] = place
        })
        .catch(err => {
          console.log("err :::\n", err);
        });
    }

    function onBeforeLeave(event, nextState) {
      if ($ionicHistory.currentStateName() !== nextState.name &&
        noResetStates.indexOf(nextState.name) === -1
      ) {
        return reset();
      }
    }

    //====================================================
    //  VM
    //====================================================

    //====================================================
    //  Private
    //====================================================

    function init() {
      //$state.params.productId 를 통해 Place를 findOne()
      return productFind({ place: $state.params.placeId })
        .then(productsWrapper => {
          return productsWrapper;
        });
    }

    function reset() {
      // vm.Model.review.rating = 0;
      // vm.Model.review.content = '';
      // vm.Model.review.photos = [];
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function productFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Products.find(queryWrapper).$promise
        .then(productsWrapper => { //{id: 1300, name: 'asda' ... }
          console.log("productsWrapper :::\n", productsWrapper);
          return productsWrapper;
        });
    }
  }
})();