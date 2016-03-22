(function() {
  'use strict';

  angular.module('app')
    .factory('SearchModel', SearchModel);

  SearchModel.$inject = [];

  function SearchModel() {

    var Model = {
      handle: 'search',
      loading: false,
      searchWord: '',
      places: []
    };

    return Model;
  }
})();
