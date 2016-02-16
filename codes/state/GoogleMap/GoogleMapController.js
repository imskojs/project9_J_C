(function() {
  'use strict';
  angular.module('app')
    .controller('GoogleMapController', GoogleMapController);

  GoogleMapController.$inject = [
    'GoogleMapModel'
  ];

  function GoogleMapController(
    GoogleMapModel
  ) {
    var GoogleMap = this;
    GoogleMap.Model = GoogleMapModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
