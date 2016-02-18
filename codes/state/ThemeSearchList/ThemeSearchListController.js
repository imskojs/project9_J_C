(function() {
  'use strict';
  angular.module('app')
    .controller('ThemeSearchListController', ThemeSearchListController);

  ThemeSearchListController.$inject = [
    'ThemeSearchListModel'
  ];

  function ThemeSearchListController(
    ThemeSearchListModel
  ) {
    var ThemeSearchList = this;
    ThemeSearchList.Model = ThemeSearchListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
