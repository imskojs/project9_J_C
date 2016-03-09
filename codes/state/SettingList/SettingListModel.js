(function() {
  'use strict';

  angular.module('app')
    .factory('SettingListModel', SettingListModel);

  SettingListModel.$inject = [];

  function SettingListModel() {

    var Model = {
      loading: false,

    };

    return Model;
  }
})();
