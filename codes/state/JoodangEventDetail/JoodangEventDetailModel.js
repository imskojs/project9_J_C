(function() {
  'use strict';

  angular.module('app')
    .factory('JoodangEventDetailModel', JoodangEventDetailModel);

  JoodangEventDetailModel.$inject = [];

  function JoodangEventDetailModel() {

    var Model = {
      handle: 'joodang-event-detail',
      loading: false,
      events: []
    };

    return Model;
  }
})();
