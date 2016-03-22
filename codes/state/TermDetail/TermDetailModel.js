(function() {
  'use strict';

  angular.module('app')
    .factory('TermDetailModel', TermDetailModel);

  TermDetailModel.$inject = [];

  function TermDetailModel() {

    var Model = {
      handle: 'term-detail',
      loading: false,
      term: {},
    };

    return Model;
  }
})();