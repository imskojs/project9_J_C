(function() {
  'use strict';
  angular.module('app')
    .controller('KeywordListController', KeywordListController);

  KeywordListController.$inject = [
    '$ionicHistory', '$scope', '$rootScope',
    'KeywordListModel', 'KeywordSearchListModel', 'RootScope', 'Util'
  ];

  function KeywordListController(
    $ionicHistory, $scope, $rootScope,
    KeywordListModel, KeywordSearchListModel, RootScope, Util
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = KeywordListModel;
    vm.toggleClass = toggleClass;
    vm.isSelected = isSelected;
    vm.search = search;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {}

    function onAfterEnter() {}

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

    function toggleClass(multipleKeyword) {
      // class= {title, photUrl, photoHoverUrl };
      let index = vm.Model.selectedMultipleKeywords.indexOf(multipleKeyword.title);
      // if class.title exists in selectedMultipleKeywords
      if (index !== -1) {
        // remove class.title from selectedMultipleKeywords
        vm.Model.selectedMultipleKeywords.splice(index, 1);
      } else {
        // else add to selectedMultipleKeywords
        vm.Model.selectedMultipleKeywords.push(multipleKeyword.title);
      }
      console.log("vm.Model.selectedMultipleKeywords :::\n", vm.Model.selectedMultipleKeywords);
    }

    function isSelected(multipleKeyword) {
      let index = vm.Model.selectedMultipleKeywords.indexOf(multipleKeyword.title);
      if (index !== -1) {
        return true;
      } else {
        return false;
      }
    }

    function search() {
      beforeSearch();
      $rootScope.goToState('Main.KeywordSearchList', {
        keywords: vm.Model.selectedMultipleKeywords,
        keywordString: vm.Model.keywordString
      }, 'forward');
      reset();
    }

    //====================================================
    //  Private
    //====================================================

    function init() {}

    function copyObject(copyObj, pasteObj) {
      for (var key in copyObj) {
        pasteObj[key] = copyObj[key];
      }
    }

    function reset() {
      var Model = {
        loading: false,
        selectedUniqueKeyword: '',
        selectedMultipleKeywords: [],
        keywordString: '',
        uniqueKeywords: [
          {
            title: '포차/호프',
            photoUrl: 'img/keyword_icon01.png',
            photoHoverUrl: 'img/keyword_hover_icon01.png'
          },
          {
            title: 'Pub',
            photoUrl: 'img/keyword_icon02.png',
            photoHoverUrl: 'img/keyword_hover_icon02.png'
          },
          {
            title: 'Bar/라운지',
            photoUrl: 'img/keyword_icon03.png',
            photoHoverUrl: 'img/keyword_hover_icon03.png'
          },
          {
            title: '이자카야',
            photoUrl: 'img/keyword_icon04.png',
            photoHoverUrl: 'img/keyword_hover_icon04.png'
          },
          {
            title: 'Beer',
            photoUrl: 'img/keyword_icon05.png',
            photoHoverUrl: 'img/keyword_hover_icon05.png'
          },
          {
            title: '와인',
            photoUrl: 'img/keyword_icon06.png',
            photoHoverUrl: 'img/keyword_hover_icon06.png'
          },
          {
            title: '전통주점',
            photoUrl: 'img/keyword_icon07.png',
            photoHoverUrl: 'img/keyword_hover_icon07.png'
          },
          {
            title: '퓨전주점',
            photoUrl: 'img/keyword_icon08.png',
            photoHoverUrl: 'img/keyword_hover_icon08.png'
          }
        ],

        multipleKeywords: [
          {
            title: '음식',
            photoUrl: 'img/keyword_icon09.png',
            photoHoverUrl: 'img/keyword_hover_icon09.png'
          },
          {
            title: '24시',
            photoUrl: 'img/keyword_icon10.png',
            photoHoverUrl: 'img/keyword_hover_icon10.png'
          },
          {
            title: '조용한',
            photoUrl: 'img/keyword_icon11.png',
            photoHoverUrl: 'img/keyword_hover_icon11.png'
          },
          {
            title: '편한의자',
            photoUrl: 'img/keyword_icon12.png',
            photoHoverUrl: 'img/keyword_hover_icon12.png'
          },
          {
            title: '내부화장실',
            photoUrl: 'img/keyword_icon13.png',
            photoHoverUrl: 'img/keyword_hover_icon13.png'
          },
          {
            title: '좌식',
            photoUrl: 'img/keyword_icon14.png',
            photoHoverUrl: 'img/keyword_hover_icon14.png'
          },
          {
            title: '흡연가능',
            photoUrl: 'img/keyword_icon15.png',
            photoHoverUrl: 'img/keyword_hover_icon15.png'
          },
          {
            title: '싸다',
            photoUrl: 'img/keyword_icon16.png',
            photoHoverUrl: 'img/keyword_hover_icon16.png'
          }
        ]
      };
      angular.copy(Model, vm.Model);
      console.log("vm.Model 222222222222222222222222222222 :::\n", vm.Model);
    }

    function beforeSearch() {
      vm.Model.selectedMultipleKeywords.push(vm.Model.selectedUniqueKeyword);
      vm.Model.keywordString = vm.Model.selectedMultipleKeywords.join(',');
      console.log("vm.Model.keywordString :::\n", vm.Model.keywordString);
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

  }
})();