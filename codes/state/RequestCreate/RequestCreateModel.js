(function() {
  'use strict';

  angular.module('app')
    .factory('RequestCreateModel', RequestCreateModel);
    //app모듈에 객체를 return하는 팩토리생성, 이름과 콜백function을 파라메터로 전달함

  RequestCreateModel.$inject = [];

  function RequestCreateModel() {
    var Model = {
      sendEmail: {
        placeName: '',
        placeNumber: '',
        location: '',
        name: '',
        phoneNumber: '',
        title: '',
        content: ''
      }
    };
    return Model;
  }
})();
