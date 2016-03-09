(function() {
  'use strict';

  angular.module('app')
    .factory('MyTalkListModel', MyTalkListModel);

  MyTalkListModel.$inject = [];

  function MyTalkListModel() {

    var Model = {
      loading: false,

      talkList: [
        {
          title: {
            type: 'STRING'
          },

          category: { // '자유톡', '연애톡', '번개톡', '유머톡', 'NOTICE', 'FAQ'
            type: 'STRING'
          },

          showInTalk: {
            type: 'BOOLEAN',
            defaultsTo: false
          },

          content: {
            type: 'STRING'
          },

          commentCount: {
            type: 'INTEGER',
            defaultsTo: 0
          },

          comments: {
            collection: 'Comment',
            via: 'post'
          },

          photos: {
            collection: 'Photo',
            via: 'post'
          },

          //====================================================
          //  Not used
          //====================================================
          place: {
            model: 'Place'
          },
          owner: {
            model: 'User'
          },
          createdBy: {
            model: 'User'
          },
          updatedBy: {
            model: 'User'
          }
        }
      ]

    };

    return Model;
  }
})();
