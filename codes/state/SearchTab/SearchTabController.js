(function() {
  'use strict';
  angular.module('app')
    .controller('SearchTabController', SearchTabController);

  SearchTabController.$inject = [
    'SearchTabModel'
  ];

  function SearchTabController(SearchTabModel) {
    var SearchTab = this;
    SearchTab.Model = SearchTabModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
