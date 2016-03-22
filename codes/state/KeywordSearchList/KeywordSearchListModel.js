(function() {
  'use strict';

  angular.module('app')
    .factory('KeywordSearchListModel', KeywordSearchListModel);

  KeywordSearchListModel.$inject = [];

  function KeywordSearchListModel() {

    var Model = {
      handle: 'keyword-search-list',
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
