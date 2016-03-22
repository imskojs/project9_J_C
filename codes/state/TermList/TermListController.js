(function() {
  'use strict';
  angular.module('app')
    .controller('TermListController', TermListController);

  TermListController.$inject = [
    '_MockData',
    '$ionicHistory', 'TermListModel'
  ];

  function TermListController(
    _MockData,
    $ionicHistory, TermListModel
  ) {
    var vm = this;
    vm.Model = TermListModel;

    //====================================================
    //  Implementation
    //====================================================
  }
})();