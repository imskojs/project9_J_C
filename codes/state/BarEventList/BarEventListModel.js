(function() {
  'use strict';

  angular.module('app')
    .factory('BarEventListModel', BarEventListModel);

  BarEventListModel.$inject = [];

  function BarEventListModel() {

    var Model = {
      handle: 'bar-event-list',
      loading: false,
      infiniteScroll: true,
      events: []
    };

    return Model;
  }
})();