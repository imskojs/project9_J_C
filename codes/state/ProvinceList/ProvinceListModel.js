(function() {
  'use strict';

  angular.module('app')
    .factory('ProvinceListModel', ProvinceListModel);

  ProvinceListModel.$inject = ['Province'];

  function ProvinceListModel(Province) {

    var Model = {
      province: Province
    };

    return Model;
  }
})();
