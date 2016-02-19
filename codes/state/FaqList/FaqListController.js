(function() {
  'use strict';
  angular.module('app')
    .controller('FaqListController', FaqListController);

  FaqListController.$inject = [
    'FaqListModel'
  ];

  function FaqListController(FaqListModel) {
    var FaqList = this;
    FaqList.Model = FaqListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
