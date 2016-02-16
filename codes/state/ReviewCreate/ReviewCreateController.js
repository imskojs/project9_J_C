(function() {
  'use strict';
  angular.module('app')
    .controller('ReviewCreateController', ReviewCreateController);

  ReviewCreateController.$inject = [
    'ReviewCreateModel'
  ];

  function ReviewCreateController(ReviewCreateModel) {
    var ReviewCreate = this;
    ReviewCreate.Model = ReviewCreateModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
