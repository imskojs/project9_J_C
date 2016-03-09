(function() {
  'use strict';
  angular.module('app')
    .controller('KeywordListController', KeywordListController);

  KeywordListController.$inject = [
    '_MockData',
    '$scope',
    'KeywordListModel', 'KeywordSearchListModel', 'RootScope'
  ];

  function KeywordListController(
    _MockData,
    $scope,
    KeywordListModel, KeywordSearchListModel, RootScope
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = KeywordListModel;
    vm.toggleClass = toggleClass;
    vm.isSelected = isSelected;
    vm.search = search;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {

    }

    function onAfterEnter() {

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
      RootScope.goToState('Main.KeywordSearchList', {
        keywords: vm.Model.selectedMultipleKeywords,
        keywordString: vm.Model.keywordString
      }, 'forward');
    }

    //====================================================
    //  Private
    //====================================================

    function init() {
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
