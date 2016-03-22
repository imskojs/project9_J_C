(function() {
  'use strict';

  angular.module('app')
    .factory('ThemeSearchListModel', ThemeSearchListModel);

  ThemeSearchListModel.$inject = [];

  function ThemeSearchListModel() {

    var Model = {
      handle: 'theme-search-list',
      loading: false,
      longitude: 126,
      latitude: 37,
      PREMIUM: {
        places: [],
        buttonLoading: false
      },
      SPECIAL: {
        places: [],
        buttonLoading: false
      },
      NORMAL: {
        places: [],
        buttonLoading: false
      }

    };

    return Model;
  }
})();
