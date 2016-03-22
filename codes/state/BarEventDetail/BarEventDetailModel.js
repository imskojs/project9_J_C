(function() {
  'use strict';

  angular.module('app')
    .factory('BarEventDetailModel', BarEventDetailModel);

  BarEventDetailModel.$inject = [];

  function BarEventDetailModel() {

    var Model = {
      handle: 'bar-event-detail',
      loading: false,
    };

    return Model;
  }
})();
