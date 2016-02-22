(function() {
  'use strict';
  angular.module('app')
    .controller('TermDetailController', TermDetailController);

  TermDetailController.$inject = [
    'TermDetailModel'
  ];

  function TermDetailController(
    TermDetailModel
  ) {
    var TermDetail = this;
    TermDetail.Model = TermDetailModel;

    //====================================================
    //  Implementation
    //====================================================
  }
})();
