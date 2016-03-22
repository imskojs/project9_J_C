(function() {
  'use strict';

  angular.module('app')
    .factory('HomeModel', HomeModel);

  HomeModel.$inject = [];

  function HomeModel() {

    var Model = {
      handle: 'home',
      loading: false,
      banners: []
    };

    return Model;
  }
})();
