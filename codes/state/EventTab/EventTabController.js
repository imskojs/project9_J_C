(function() {
  'use strict';
  angular.module('app')
    .controller('EventTabController', EventTabController);

  EventTabController.$inject = [
    'EventTabModel'
  ];

  function EventTabController(EventTabModel) {
    var EventTab = this;
    EventTab.Model = EventTabModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
