(function() {
  'use strict';

  angular.module('app')
    .factory('FooterModel', FooterModel);

  FooterModel.$inject = [];

  function FooterModel() {

    var Model = {
      loading: false,

    };

    return Model;
  }
})();
