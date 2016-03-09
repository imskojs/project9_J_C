(function() {
  'use strict';

  angular.module('app')
    .factory('KeywordSearchListModel', KeywordSearchListModel);

  KeywordSearchListModel.$inject = [];

  function KeywordSearchListModel() {

    var Model = {
      loading: false,
      premium: {
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
            showDiscountTag: false,
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
            showDiscountTag: false,
            discountTitle: '5%할인',
            showEventTag: true,
            // province: '강남',
            // themes: ['헌팅', '데이트'],
          },
          {
            name: 'premium3포차',
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
            showDiscountTag: false,
            discountTitle: '5%할인',
            showEventTag: true,
            // province: '강남',
            // themes: ['헌팅', '데이트'],
          }
        ]
      },
      special: {
        places: [
          {
            name: 'special1포차',
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
            showDiscountTag: false,
            discountTitle: '5%할인',
            showEventTag: true,
            // province: '강남',
            // themes: ['헌팅', '데이트'],
          },
          {
            name: 'special2포차',
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
            name: 'special3포차',
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
      },
      normal: {
        places: [
          {
            name: 'normal3포차',
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
            showDiscountTag: false,
            discountTitle: '5%할인',
            showEventTag: true,
            // province: '강남',
            // themes: ['헌팅', '데이트'],
          },
          {
            name: 'normal3포차',
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
            name: 'normal3포차',
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
      }

    };

    return Model;
  }
})();
