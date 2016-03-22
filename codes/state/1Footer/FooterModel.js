(function() {
  'use strict';

  angular.module('app')
    .factory('FooterModel', FooterModel);

  FooterModel.$inject = [];

  function FooterModel() {

    var Model = {
      handle: 'footer',
      loading: false,

    };

    return Model;
  }
})();
