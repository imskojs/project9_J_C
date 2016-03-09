(function() {
  'use strict';

  angular.module('app')
    .factory('JoodangEventListModel', JoodangEventListModel);

  JoodangEventListModel.$inject = [];

  function JoodangEventListModel() {

    var Model = {
      loading: false,
      events: []
    };

    return Model;
  }
})();
