(function() {
  'use strict';
  angular.module('app')
    .controller('SettingListController', SettingListController);

  SettingListController.$inject = [
    'SettingListModel'
  ];

  function SettingListController(SettingListModel) {
    var SettingList = this;
    SettingList.Model = SettingListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
