(function() {
  'use strict';
  angular.module('app')
    .controller('ProvinceListController', ProvinceListController);

  ProvinceListController.$inject = [
    'ProvinceListModel'
  ];

  function ProvinceListController(ProvinceListModel) {
    var ProvinceList = this;
    ProvinceList.Model = ProvinceListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
