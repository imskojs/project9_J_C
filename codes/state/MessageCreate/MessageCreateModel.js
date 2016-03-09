(function() {
  'use strict';

  angular.module('app')
    .factory('MessageCreateModel', MessageCreateModel);

  MessageCreateModel.$inject = [];

  //AppStorage.user.roles[0] === 'OWNER', 'USER', 'ADMIN'
  function MessageCreateModel() {

    var Model = {
      loading: false,
      user: {},
      messages: []
    };

    return Model;
  }
})();
