(function() {
  'use strict';

  angular.module('app')
    .factory('TalkCreateModel', TalkCreateModel);

  TalkCreateModel.$inject = [];

  function TalkCreateModel() {

    var Model = {
      handle: 'talk-create',
      loading: false,
      categoryToggle: false,
      images: [],
      files: [],
      create: [],
      tempFiles: [],
      destroy: [],
      post: {
        title: '',
        category: '',
        isAnnonymous: false, //false는 실명, true는 익명
        content: '',
        photos: [],
        showInTalk: true //false이면 공지글, true이면 일반게시글
      }
    };

    return Model;
  }
})();
