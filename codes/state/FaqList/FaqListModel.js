(function() {
  'use strict';

  angular.module('app')
    .factory('FaqListModel', FaqListModel);

  FaqListModel.$inject = [];

  function FaqListModel() {

    var Model = {
      handle: 'faq-list',
      loading: false,
      posts: []
    };

    return Model;
  }
})();
