(function() {
  'use strict';

  angular.module('app')
    .factory('ProvinceSearchListModel', ProvinceSearchListModel);

  ProvinceSearchListModel.$inject = [];

  function ProvinceSearchListModel() {

    var Model = {
      handle: 'province-search-list',
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
