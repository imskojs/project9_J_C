(function() {
  'use strict';
  angular.module('app')
    .controller('CompanyCreateController', CompanyCreateController);

  CompanyCreateController.$inject = [
    'CompanyCreateModel'
  ];  //Controller함수에 factory로 생성된 model을 주입(factory 이름).
  //동일한 app 모듈에 선언한 factory이기 때문에 주입받을 수 있다.

  function CompanyCreateController(CompanyCreateModel) {
    var CompanyCreate = this;
    CompanyCreate.Model = CompanyCreateModel;  //$inject 된 factory

    //====================================================
    //  Implementation
    //====================================================
  }
})();
