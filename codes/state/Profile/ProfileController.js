(function() {
  'use strict';
  angular.module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
    '_MockData',
    '$scope', '$state',
    '$ionicModal',
    'ProfileModel', 'Users'
  ];

  function ProfileController(
    _MockData,
    $scope, $state,
    $ionicModal,
    ProfileModel, Users
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = ProfileModel;
    vm.logout = logout;
    vm.NicknameUpdate = NicknameUpdate;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    $ionicModal.fromTemplateUrl("state/Profile/Modal/NicknameUpdateModal.html", {  //이 위치의 html내용을 모달로 사용
      scope: $scope,         //옵션1
      animation: 'mh-slide'  //옵션2
    }).then(function (modal) {  //콜백
      vm.NicknameUpdateModal = modal;
    });

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      console.log("$state.params.keywords :::\n", $state.params.keywords);
      console.log("$state.params.keywordString :::\n", $state.params.keywordString);
      // initPromise = init();
    }

    function onAfterEnter() {
      // initPromise
      //   .then((array) => {
      //     let premiumPlacesWrapper = array[0];
      //     let specialPlacesWrapper = array[1];
      //     let normalPlacesWrapper = array[2];
      //     // ProfileModel.premium.places = premiumPlacesWrapper.places;
      //     // ProfileModel.special.places = specialPlacesWrapper.places;
      //     // Util.bindData(normalPlacesWrapper, ProfileModel.normal, 'places');
      //   })
    }

    //====================================================
    //  VM
    //====================================================

    //====================================================
    //  Private
    //====================================================

    function init() {
      let premiumPromise = placeFind({ category: 'PREMIUM' });
      let specialPromise = placeFind({ category: 'SPECIAL' });
      let normalPromise = placeFind({ category: 'NORMAL' });
      return $q.all([premiumPromise, specialPromise, normalPromise])
        .then((array) => {
          return array;
        })
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function placeFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
          keywords: $state.params.keywords,
          sort: {},
          limit: 30
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Places.find(queryWrapper).$promise
        .then((placeList) => {
          return placeList;
        });
    }

    function logout () {
      // Users.logout();
      //session kill
    }

    function NicknameUpdate () {
      // User.update()
      // vm.Model.user.hopeNickname 쿼리에 담아서 update전송
      //  Implementation
      vm.NicknameUpdateModal.hide();
    };

  }
})();
