(function() {
  'use strict';

  angular.module('app')
    .factory('RequestUpdateModel', RequestUpdateModel);
  //app모듈에 객체를 return하는 팩토리생성, 이름과 콜백function을 파라메터로 전달함

  RequestUpdateModel.$inject = [];

  function RequestUpdateModel() {
    var Model = {
      handle: 'request-update',
      loading: false,
      sendEmail: {
        type: '', //Not Null
        email: '',
        contact: '',
        title: '',
        content: '',
        placeName: '',
        placeContact: '',
        location: '',
        userName: '',
        userContact: '',
        options: {
          placeId: '',
          infomation: '',
          menuAndPrice: '',
          eventAndDiscount: '',
          stateChange: '',
          other: '',
        }
      }
    };
    return Model;
  }
})();
