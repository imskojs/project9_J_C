(function() {
  'use strict';
  angular.module('app')
    .controller('ProvinceSearchListController', ProvinceSearchListController);

  ProvinceSearchListController.$inject = [
    'ProvinceSearchListModel'
  ];

  function ProvinceSearchListController(
    ProvinceSearchListModel
  ) {
    var ProvinceSearchList = this;
    ProvinceSearchList.Model = ProvinceSearchListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
