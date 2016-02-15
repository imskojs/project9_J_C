(function() {
  'use strict';
  angular.module('app')
    .controller('FooterController', FooterController);

  FooterController.$inject = [
    'FooterModel'
  ];

  function FooterController(
    FooterModel
  ) {
    var Footer = this;
    Footer.Model = FooterModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
