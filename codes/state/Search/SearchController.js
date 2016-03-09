(function() {
  'use strict';
  angular.module('app')
    .controller('SearchController', SearchController);

  SearchController.$inject = [
    '_MockData',
    'SearchModel'
  ];

  function SearchController(
    _MockData,
    SearchModel
  ) {
    var Search = this;
    Search.Model = SearchModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
