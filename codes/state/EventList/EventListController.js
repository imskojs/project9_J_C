(function() {
  'use strict';
  angular.module('app')
    .controller('EventListController', EventListController);

  EventListController.$inject = [
    'EventListModel'
  ];

  function EventListController(EventListModel) {
    var EventList = this;
    EventList.Model = EventListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
