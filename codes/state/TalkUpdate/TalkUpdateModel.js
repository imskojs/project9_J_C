(function() {
  'use strict';

  angular.module('app')
    .factory('TalkUpdateModel', TalkUpdateModel);

  TalkUpdateModel.$inject = [];

  function TalkUpdateModel() {

    var Model = {
      loading: false,
      categoryToggle: false,
      post: {
        id: '',
        title: '',
        category: '',
        isAnnonymous: true,  //true이면 보이기, false면 익명
        content: '',
        photos: []
      }

    };

    return Model;
  }
})();
