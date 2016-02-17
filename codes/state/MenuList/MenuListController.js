(function() {
  'use strict';
  angular.module('app')
    .controller('MenuListController', MenuListController);

  MenuListController.$inject = [
    'MenuListModel'
  ];

  function MenuListController(MenuListModel) {
    var MenuList = this;
    MenuList.Model = MenuListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
