(function() {
  'use strict';

  angular.module('app')
    .factory('CompanyCreateModel', CompanyCreateModel);
    //app모듈에 객체를 return하는 팩토리생성, 이름과 콜백function을 파라메터로 전달함

  CompanyCreateModel.$inject = [];

  function CompanyCreateModel() {
    var Model = {
      placeName: '',
      phoneNumber: '',
      location: '',
      title: '',
      content: ''
    };
    return Model;
  }
})();
