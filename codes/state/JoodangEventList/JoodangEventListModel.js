(function() {
  'use strict';

  angular.module('app')
    .factory('JoodangEventListModel', JoodangEventListModel);

  JoodangEventListModel.$inject = [];

  function JoodangEventListModel() {

    var Model = {
      handle: 'joodang-event-list',
      loading: false,
      infiniteScroll: true,
      events: []
    };

    return Model;
  }
})();