(function() {
  'use strict';

  angular.module('app')
    .factory('ContactCreateModel', ContactCreateModel);
    //app모듈에 객체를 return하는 팩토리생성, 이름과 콜백function을 파라메터로 전달함

  ContactCreateModel.$inject = [];

  function ContactCreateModel() {
    var Model = {
      email: '',
      phoneNumber: '',
      title: '',
      content: ''
    };
    return Model;
  }
})();
