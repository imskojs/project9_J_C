(function() {
  'use strict';
  angular.module('app')
    .controller('ContactCreateController', ContactCreateController);

  ContactCreateController.$inject = [
    'ContactCreateModel'
  ];  //Controller함수에 factory로 생성된 model을 주입(factory 이름).
  //동일한 app 모듈에 선언한 factory이기 때문에 주입받을 수 있다.

  function ContactCreateController(ContactCreateModel) {
    var ContactCreate = this;
    ContactCreate.Model = ContactCreateModel;  //$inject 된 factory

    //====================================================
    //  Implementation
    //====================================================
  }
})();
