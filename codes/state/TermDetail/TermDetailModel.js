(function() {
  'use strict';

  angular.module('app')
    .factory('TermDetailModel', TermDetailModel);

  TermDetailModel.$inject = [];

  function TermDetailModel() {

    var Model = {
      loading: false,

    };

    return Model;
  }
})();
