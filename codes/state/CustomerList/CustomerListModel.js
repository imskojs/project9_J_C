(function() {
  'use strict';

  angular.module('app')
    .factory('CustomerListModel', CustomerListModel);

  CustomerListModel.$inject = [];

  function CustomerListModel() {

    var Model = {
      handle: 'customer-list',
      loading: false,

    };

    return Model;
  }
})();
