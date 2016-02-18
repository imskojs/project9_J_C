(function() {
  'use strict';
  angular.module('app')
    .controller('TalkCreateController', TalkCreateController);

  TalkCreateController.$inject = [
    'TalkCreateModel'
  ];

  function TalkCreateController(TalkCreateModel) {
    var TalkCreate = this;
    TalkCreate.Model = TalkCreateModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
