(function() {
  'use strict';
  angular.module('app')
    .controller('JoodangEventDetailController', JoodangEventDetailController);

  JoodangEventDetailController.$inject = [
    'JoodangEventDetailModel'
  ];

  function JoodangEventDetailController(JoodangEventDetailModel) {
    var JoodangEventDetail = this;
    JoodangEventDetail.Model = JoodangEventDetailModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
