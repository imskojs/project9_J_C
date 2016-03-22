(function() {
  'use strict';

  angular.module('app')
    .factory('SettingListModel', SettingListModel);

  SettingListModel.$inject = [];

  function SettingListModel() {

    var Model = {
      handle: 'setting-list',
      loading: false,
      isSettingShow: true,
      settings: {
        isPush: true,
      }
    };

    return Model;
  }
})();
