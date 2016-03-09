(function() {
  'use strict';

  angular.module('app')
    .factory('FavoriteListModel', FavoriteListModel);

  FavoriteListModel.$inject = [];

  function FavoriteListModel() {

    var Model = {
      loading: false,
      places: [
        {
          name: 'premium1포차',
          tags: ['역삼', '포차/호프', '이벤트', '회원해택', '피아노'],
          category: 'PREMIUM',
          address: '서울특별시 강남구 역삼동 723-1',
          geoJSON: {
            type: 'Point',
            coordinates: [130, 45]
          },
          photos: [{
            url: 'http://placehold.it/300x200'
          }, {
            url: 'http://placehold.it/300x188'
          }],
          showDiscountTag: true,
          discountTitle: '5%할인',
          showEventTag: true,
          // province: '강남',
          // themes: ['헌팅', '데이트'],
        },
        {
          name: 'premium2포차',
          tags: ['역삼', '포차/호프', '이벤트', '회원해택', '피아노'],
          category: 'PREMIUM',
          address: '서울특별시 강남구 역삼동 723-1',
          geoJSON: {
            type: 'Point',
            coordinates: [130, 45]
          },
          photos: [{
            url: 'http://placehold.it/300x200'
          }, {
            url: 'http://placehold.it/300x188'
          }],
          showDiscountTag: true,
          discountTitle: '5%할인',
          showEventTag: true,
          // province: '강남',
          // themes: ['헌팅', '데이트'],
        }
      ]
    };

    return Model;
  }
})();
