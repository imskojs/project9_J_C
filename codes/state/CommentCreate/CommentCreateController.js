(function() {
  'use strict';
  angular.module('app')
    .controller('CommentCreateController', CommentCreateController);

  CommentCreateController.$inject = [
    'CommentCreateModel'
  ];

  function CommentCreateController(CommentCreateModel) {
    var CommentCreate = this;
    CommentCreate.Model = CommentCreateModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
