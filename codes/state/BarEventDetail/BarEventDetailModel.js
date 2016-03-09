(function() {
  'use strict';

  angular.module('app')
    .factory('BarEventDetailModel', BarEventDetailModel);

  BarEventDetailModel.$inject = [];

  function BarEventDetailModel() {

    var Model = {
      loading: false,
      photos: {
        collection: 'Photo',
        via: 'event'
      },

      title: {
        type: 'STRING'
      },

      category: 'JOODANG-EVENT',
      // 버튼 보이기
      showLinkButton: {
        type: 'Boolean'
      },
      //기간
      duration: {
        type: 'String'
      },
      //장소
      location: {
        type: 'String'
      },
      // 이벤트 상세내용
      content: {
        type: 'String'
      },
      // 주의사항
      warning: {
        type: 'String'
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
    };

    return Model;
  }
})();
