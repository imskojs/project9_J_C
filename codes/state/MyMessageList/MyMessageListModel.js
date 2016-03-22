(function() {
  'use strict';

  angular.module('app')
    .factory('MyMessageListModel', MyMessageListModel);

  MyMessageListModel.$inject = [];

  function MyMessageListModel() {

    var Model = {
      handle: 'my-message-list',
      loading: false,


      messages: [
        {
          sender: {
            model: 'User',
            index: true
          },
          receiver: {
            model: 'User',
            index: true
          },
          content: {
            type: 'STRING'
          },
          isNew: {
            type: 'BOOLEAN',
            defaultsTo: true
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
        },
        {
          sender: {
            model: 'User',
            index: true
          },
          receiver: {
            model: 'User',
            index: true
          },
          content: {
            type: 'STRING'
          },
          isNew: {
            type: 'BOOLEAN',
            defaultsTo: true
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
        },
      ]
    };

    return Model;
  }
})();
