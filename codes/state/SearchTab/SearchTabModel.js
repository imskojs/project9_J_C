(function() {
  'use strict';

  angular.module('app')
    .factory('SearchTabModel', SearchTabModel);

  SearchTabModel.$inject = [];

  function SearchTabModel() {

    var Model = {
      loading: false,
      currentTab: ''

    };

    return Model;
  }
})();
