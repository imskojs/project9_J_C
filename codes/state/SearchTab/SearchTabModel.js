(function() {
  'use strict';

  angular.module('app')
    .factory('SearchTabModel', SearchTabModel);

  SearchTabModel.$inject = [];

  function SearchTabModel() {

    var Model = {
      handle: 'search-tab',
      loading: false,
      currentTab: 'PROVINCE'
    };

    return Model;
  }
})();