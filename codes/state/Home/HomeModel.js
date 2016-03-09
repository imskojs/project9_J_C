(function() {
  'use strict';

  angular.module('app')
    .factory('HomeModel', HomeModel);

  HomeModel.$inject = [];

  function HomeModel() {

    var Model = {
      loading: false,
      banners: []
    };

    return Model;
  }
})();
