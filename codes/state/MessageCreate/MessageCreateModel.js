(function() {
  'use strict';

  angular.module('app')
    .factory('MessageCreateModel', MessageCreateModel);

  MessageCreateModel.$inject = [];

  //AppStorage.user.roles[0] === 'OWNER', 'USER', 'ADMIN'
  function MessageCreateModel() {

    var Model = {
      handle: 'message-create',
      loading: false,
      // [{dayBreaker: true}, {dayBreaker: false}]
      messages: [],
      message: {
        sender: '',
        receiver: '',
        content: ''
      },
      places: [],
      placesString: ''

    };

    return Model;
  }
})();
