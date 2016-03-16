(function() {
  'use strict';

  angular.module('app')
    .factory('SearchModel', SearchModel);

  SearchModel.$inject = [];

  function SearchModel() {

    var Model = {
      loading: false,
      searchWord: '',
      places: []
    };

    return Model;
  }
})();
