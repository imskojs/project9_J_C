(function() {
  'use strict';

  angular.module('app')
    .factory('ProvinceListModel', ProvinceListModel);

  ProvinceListModel.$inject = ['Province'];

  function ProvinceListModel(Province) {

    var Model = {
      handle: 'province-list',
      loading: false,
      toggleArray: [],
      province: Province
    };

    return Model;
  }
})();
