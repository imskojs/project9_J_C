(function() {
  'use strict';

  angular.module('app')
    .factory('ThemeListModel', ThemeListModel);

  ThemeListModel.$inject = [];

  function ThemeListModel() {

    var Model = {
      handle: 'theme-list',
      loading: false,
      themes: [
        {
          title: '헌팅',
          url: 'img/theme_01.png'
        },
        {
          title: '데이트',
          url: 'img/theme_02.png'
        },
        {
          title: '단체',
          url: 'img/theme_03.png'
        },
        {
          title: '술마시기좋은',
          url: 'img/theme_04.png'
        },
        {
          title: '안주가맛있는',
          url: 'img/theme_05.png'
        },
      ]
    };

    return Model;
  }
})();
