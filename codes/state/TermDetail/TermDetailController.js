(function() {
  'use strict';
  angular.module('app')
    .controller('TermDetailController', TermDetailController);

  TermDetailController.$inject = [
    '_MockData',
    'TermDetailModel'
  ];

  function TermDetailController(
    _MockData,
    TermDetailModel
  ) {
    var TermDetail = this;
    TermDetail.Model = TermDetailModel;

    //====================================================
    //  Implementation
    //====================================================
  }
})();
