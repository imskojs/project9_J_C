(function() {
  'use strict';
  angular.module('app')
    .controller('ThemeListController', ThemeListController);

  ThemeListController.$inject = [
    'ThemeListModel'
  ];

  function ThemeListController(ThemeListModel) {
    var ThemeList = this;
    ThemeList.Model = ThemeListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
