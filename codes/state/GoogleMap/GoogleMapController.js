(function() {
  'use strict';
  angular.module('app')
    .controller('GoogleMapController', GoogleMapController);

  GoogleMapController.$inject = [
    '_MockData',
    'GoogleMapModel'
  ];

  function GoogleMapController(
    _MockData,
    GoogleMapModel
  ) {
    var GoogleMap = this;
    GoogleMap.Model = GoogleMapModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
