(function() {
  'use strict';
  angular.module('app')
    .controller('BarEventDetailController', BarEventDetailController);

  BarEventDetailController.$inject = [
    'BarEventDetailModel'
  ];

  function BarEventDetailController(BarEventDetailModel) {
    var BarEventDetail = this;
    BarEventDetail.Model = BarEventDetailModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
