(function() {
  'use strict';
  angular.module('app')
    .controller('TalkUpdateController', TalkUpdateController);

  TalkUpdateController.$inject = [
    'TalkUpdateModel'
  ];

  function TalkUpdateController(TalkUpdateModel) {
    var TalkUpdate = this;
    TalkUpdate.Model = TalkUpdateModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
