(function() {
  'use strict';

  angular.module('app')
    .factory('CustomerListModel', CustomerListModel);

  CustomerListModel.$inject = [];

  function CustomerListModel() {

    var Model = {
      loading: false,

    };

    return Model;
  }
})();
