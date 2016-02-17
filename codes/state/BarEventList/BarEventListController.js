(function() {
  'use strict';
  angular.module('app')
    .controller('BarEventListController', BarEventListController);

  BarEventListController.$inject = [
    'BarEventListModel'
  ];

  function BarEventListController(BarEventListModel) {
    var BarEventList = this;
    BarEventList.Model = BarEventListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
