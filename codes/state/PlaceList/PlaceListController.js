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

    init();
    function init() {
      //서버로부터 업체의 data를 Array로 가져옴.
      console.log("aaa");
    };
  }
})();
