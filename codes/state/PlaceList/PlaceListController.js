(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceListController', PlaceListController);

  PlaceListController.$inject = [
    'PlaceListModel'
  ];

  function PlaceListController(
    PlaceListModel
  ) {
    var PlaceList = this;
    PlaceList.Model = PlaceListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
