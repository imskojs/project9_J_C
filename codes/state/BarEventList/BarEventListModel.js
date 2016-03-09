(function() {
  'use strict';

  angular.module('app')
    .factory('BarEventListModel', BarEventListModel);

  BarEventListModel.$inject = [];

  function BarEventListModel() {

    var Model = {
      loading: false,
      events: []
    };

    return Model;
  }
})();
