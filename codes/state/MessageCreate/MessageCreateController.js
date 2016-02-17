(function() {
  'use strict';
  angular.module('app')
    .controller('MessageCreateController', MessageCreateController);

  MessageCreateController.$inject = [
    'MessageCreateModel'
  ];

  function MessageCreateController(MessageCreateModel) {
    var MessageCreate = this;
    MessageCreate.Model = MessageCreateModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
