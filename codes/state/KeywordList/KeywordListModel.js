(function() {
  'use strict';

  angular.module('app')
    .factory('KeywordListModel', KeywordListModel);

  KeywordListModel.$inject = [];

  function KeywordListModel() {

    var Model = {
      loading: false,
      uniqueKeywords: [
        {
          title: '포차/호프',
          photoUrl: 'img/keyword_icon01.png',
          photoHoverUrl: 'img/keyword_hover_icon01.png'
        },
        {
          title: 'Pub',
          photoUrl: 'img/keyword_icon02.png',
          photoHoverUrl: 'img/keyword_hover_icon02.png'
        },
        {
          title: 'Bar/라운지',
          photoUrl: 'img/keyword_icon03.png',
          photoHoverUrl: 'img/keyword_hover_icon03.png'
        },
        {
          title: '이자카야',
          photoUrl: 'img/keyword_icon04.png',
          photoHoverUrl: 'img/keyword_hover_icon04.png'
        },
        {
          title: 'Beer',
          photoUrl: 'img/keyword_icon05.png',
          photoHoverUrl: 'img/keyword_hover_icon05.png'
        },
        {
          title: '와인',
          photoUrl: 'img/keyword_icon06.png',
          photoHoverUrl: 'img/keyword_hover_icon06.png'
        },
        {
          title: '전통주점',
          photoUrl: 'img/keyword_icon07.png',
          photoHoverUrl: 'img/keyword_hover_icon07.png'
        },
        {
          title: '퓨전주점',
          photoUrl: 'img/keyword_icon08.png',
          photoHoverUrl: 'img/keyword_hover_icon08.png'
        }
      ],

      multipleKeywords: [
        {
          title: '음식',
          photoUrl: 'img/keyword_icon09.png',
          photoHoverUrl: 'img/keyword_hover_icon09.png'
        },
        {
          title: '24시',
          photoUrl: 'img/keyword_icon10.png',
          photoHoverUrl: 'img/keyword_hover_icon10.png'
        },
        {
          title: '조용한',
          photoUrl: 'img/keyword_icon11.png',
          photoHoverUrl: 'img/keyword_hover_icon11.png'
        },
        {
          title: '편한의자',
          photoUrl: 'img/keyword_icon12.png',
          photoHoverUrl: 'img/keyword_hover_icon12.png'
        },
        {
          title: '내부화장실',
          photoUrl: 'img/keyword_icon13.png',
          photoHoverUrl: 'img/keyword_hover_icon13.png'
        },
        {
          title: '좌식',
          photoUrl: 'img/keyword_icon14.png',
          photoHoverUrl: 'img/keyword_hover_icon14.png'
        },
        {
          title: '흡연가능',
          photoUrl: 'img/keyword_icon15.png',
          photoHoverUrl: 'img/keyword_hover_icon15.png'
        },
        {
          title: '싸다',
          photoUrl: 'img/keyword_icon16.png',
          photoHoverUrl: 'img/keyword_hover_icon16.png'
        }
      ],
      selectedUniqueKeyword: '',
      selectedMultipleKeywords: [],
      keywordString: ''
    };

    return Model;
  }
})();
