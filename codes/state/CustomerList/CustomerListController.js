(function() {
  'use strict';
  angular.module('app')
    .controller('CustomerListController', CustomerListController);

  CustomerListController.$inject = [
    '_MockData',
    'CustomerListModel'
  ];

  function CustomerListController(
    _MockData,CustomerListModel) {
    var CustomerList = this;
    CustomerList.Model = CustomerListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
