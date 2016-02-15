(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceDetailController', PlaceDetailController);

  PlaceDetailController.$inject = [
    'PlaceDetailModel'
  ];

  function PlaceDetailController(
    PlaceDetailModel
  ) {
    var PlaceDetail = this;
    PlaceDetail.Model = PlaceDetailModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
