(function() {
  'use strict';
  angular.module('app')
    .controller('CustomerListController', CustomerListController);

  CustomerListController.$inject = [
    'CustomerListModel'
  ];

  function CustomerListController(CustomerListModel) {
    var CustomerList = this;
    CustomerList.Model = CustomerListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
