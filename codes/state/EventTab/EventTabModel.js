(function() {
  'use strict';

  angular.module('app')
    .factory('EventTabModel', EventTabModel);

  EventTabModel.$inject = [];

  function EventTabModel() {

    var Model = {
      handle: 'event-tab',
      loading: false,
      currentTab: '주당이벤트',
    };

    return Model;
  }
})();
