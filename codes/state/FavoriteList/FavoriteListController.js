(function() {
  'use strict';
  angular.module('app')
    .controller('FavoriteListController', FavoriteListController);

  FavoriteListController.$inject = [
    'FavoriteListModel'
  ];

  function FavoriteListController(
    FavoriteListModel
  ) {
    var FavoriteList = this;
    FavoriteList.Model = FavoriteListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
