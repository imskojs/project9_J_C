(function() {
  'use strict';

  angular.module('app')
    .factory('FaqListModel', FaqListModel);

  FaqListModel.$inject = [];

  function FaqListModel() {

    var Model = {
      loading: false,
      faqList: [
        {
          title: '주당은 어떤 서비스인가요?',
          content: '주당님들이 술집을 편하게 찾는 서비스입니다.',
          show: false
        },
        {
          title: '주당 이용시 가능한 혜택은 무엇이 있나요?',
          content: '50%할인을 받습니다.',
          show: false
        },
        {
          title: '정말 할인이 되나요?',
          content: '네 진짜 됩니다. 믿어보세요.',
          show: false
        },
        {
          title: '주점에서 할인받는 절차는 어떻게되나요?',
          content: '주당앱을 보여주면 됩니다.',
          show: false
        }
      ]

    };

    return Model;
  }
})();
