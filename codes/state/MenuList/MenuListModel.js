(function() {
  'use strict';

  angular.module('app')
    .factory('MenuListModel', MenuListModel);

  MenuListModel.$inject = [];

  function MenuListModel() {

    var Model = {
      loading: false,
      products: []
    };

    return Model;
  }
})();
