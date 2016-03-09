(function() {
  'use strict';

  angular.module('app')
    .factory('TermListModel', TermListModel);

  TermListModel.$inject = [];

  function TermListModel() {

    var Model = {
      loading: false,

    };

    return Model;
  }
})();
