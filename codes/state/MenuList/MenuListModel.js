(function() {
  'use strict';

  angular.module('app')
    .factory('MenuListModel', MenuListModel);

  MenuListModel.$inject = [];

  function MenuListModel() {

    var Model = {
      handle: 'menu-list',
      loading: false,
      products: []
    };

    return Model;
  }
})();
