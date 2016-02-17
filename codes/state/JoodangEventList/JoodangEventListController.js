(function() {
  'use strict';
  angular.module('app')
    .controller('JoodangEventListController', JoodangEventListController);

  JoodangEventListController.$inject = [
    'JoodangEventListModel'
  ];

  function JoodangEventListController(JoodangEventListModel) {
    var JoodangEventList = this;
    JoodangEventList.Model = JoodangEventListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
