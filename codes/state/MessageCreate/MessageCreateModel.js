(function() {
  'use strict';

  angular.module('app')
    .factory('MessageCreateModel', MessageCreateModel);

  MessageCreateModel.$inject = [];

  //AppStorage.user.roles[0] === 'OWNER', 'USER', 'ADMIN'
  function MessageCreateModel() {

    var Model = {
      loading: false,
      // [{dayBreaker: true}, {dayBreaker: false}]
      messages: [],
      message: {
        sender: '',
        receiver: '',
        content: ''
      }
    };

    return Model;
  }
})();
