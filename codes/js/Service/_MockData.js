(function() {
  'use strict';

  angular.module('app')
    .factory('_MockData', _MockData);

  _MockData.$inject = [];

  function _MockData() {

    var geoJSON_example = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [102.0, 0.5]
          },
          "properties": {"prop0": "value0"}
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
            ]
          },
          "properties": {
            "prop0": "value0",
            "prop1": 0.0
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]
            ]]
          },
          "properties": {
            "prop0": "value0",
            "prop1": {"this": "that"}
          }
        }
      ]
    };

    var Model = {


      //===================================================================


      banner1: {
        id: 100,
        isExternal: true,
        homepage: 'http://naver.com',
        index: 1,
        get event() { return Model.event1; },
        get photo() { return Model.photo1; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      banner2: {
        id: 101,
        isExternal: true,
        homepage: 'http://naver.com',
        index: 2,
        get event() { return Model.event2; },
        get photo() { return Model.photo2; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      banner3: {
        id: 102,
        isExternal: true,
        homepage: 'http://naver.com',
        index: 3,
        get event() { return Model.event3; },
        get photo() { return Model.photo3; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // banners: [this.banner1, this.banner2, this.banner3],


      //===================================================================


      comment1: {
        id: 200,
        content: '하나 댓글입니다~!',
        isAnnonymous: false,
        get post() { return Model.post1; },
        get review() { return Model.review1; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      comment2: {
        id: 201,
        content: '두울 댓글입니다~!',
        isAnnonymous: true,
        get post() { return Model.post2; },
        get review() { return Model.review2; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      comment3: {
        id: 202,
        content: '세엣 댓글입니다~!',
        isAnnonymous: true,
        get post() { return Model.post3; },
        get review() { return Model.review3; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // comments: [this.comment1, this.comment2, this.comment3],


      //===================================================================


      device1: {
        id: 400,
        deviceId: 'Galaxy S7',
        platform: 'ANDROID',
        active: true,

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      device2: {
        id: 401,
        deviceId: 'iPhone 5',
        platform: 'IOS',
        active: true,

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      device3: {
        id: 402,
        deviceId: 'iPhone 6 Plus',
        platform: 'IOS',
        active: false,

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // devices: [this.device1, this.device2, this.device3],


      //===================================================================


      event1: {
        id: 500,
        title: '하나 이벤트!(제목)',
        category: 'JOODANG-EVENT',
        showLinkButton: true,
        duration: '2016.03.07 ~ 2016.03.09',
        location: '1역삼동 르네상스호텔',
        content: '1맛있는 식사를 해봅시다!',
        warning: '1만 19세 미만은 참가할 수 없습니다.',
        get photo() { return Model.photo1; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      event2: {
        id: 501,
        title: '두울 이벤트!(제목)',
        category: 'BAR-EVENT',
        showLinkButton: true,
        duration: '2016.03.07 ~ 2016.03.09',
        location: '2역삼동 르네상스호텔',
        content: '2맛있는 식사를 해봅시다!',
        warning: '2만 19세 미만은 참가할 수 없습니다.',
        get photo() { return Model.photo2; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      event3: {
        id: 502,
        title: '세엣 이벤트!(제목)',
        category: 'BAR-EVENT',
        showLinkButton: false,
        duration: '2016.03.07 ~ 2016.03.09',
        location: '3역삼동 르네상스호텔',
        content: '3맛있는 식사를 해봅시다!',
        warning: '3만 19세 미만은 참가할 수 없습니다.',
        get photo() { return Model.photo3; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // events: [this.event1, this.event2, this.event3],


      //===================================================================


      favorite1: {
        id: 600,
        get place() { return Model.place1; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      favorite2: {
        id: 601,
        get place() { return Model.place2; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      favorite3: {
        id: 602,
        get place() { return Model.place3; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // favorites: [this.favorite1, this.favorite2, this.favorite3],


      //===================================================================


      like1: {
        id: 700,
        get post() { return Model.post1; },
        get place() { return Model.place1; },
        get product() { return Model.product1; },
        get comment() { return Model.comment1; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      like2: {
        id: 701,
        get post() { return Model.post2; },
        get place() { return Model.place2; },
        get product() { return Model.product2; },
        get comment() { return Model.comment2; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      like3: {
        id: 702,
        get post() { return Model.post3; },
        get place() { return Model.place3; },
        get product() { return Model.product3; },
        get comment() { return Model.comment3; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // likes: [this.like1, this.like2, this.like3],


      //===================================================================


      message1: {
        id: 800,
        content: '안녕하세요? 예약좀 할려고하는데요, 계신가요?!',
        isNew: true,
        get sender() { return Model.user; },
        get receiver() { return Model.owner; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      message2: {
        id: 801,
        content: '네 안녕하세요, 몇시로 예약해드릴까요? 성함과 연락처 알려주세요!',
        isNew: true,
        get sender() { return Model.owner; },
        get receiver() { return Model.user; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      message3: {
        id: 802,
        content: '예약자 이름은 동호로 해주시구요, 연락처는 010-111-2222입니다. 오늘저녁 10시 예약부탁드립니다!ㅎㅎ 감사해요~!',
        isNew: true,
        get sender() { return Model.user; },
        get receiver() { return Model.owner; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      message4: {
        id: 803,
        content: '예약자 이름은 동호로 해주시구요, 연락처는 010-111-2222입니다. 오늘저녁 10시 예약부탁드립니다!ㅎㅎ 감사해요~!',
        isNew: true,
        get sender() { return Model.user; },
        get receiver() { return Model.owner; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      message5: {
        id: 804,
        content: '예약자 이름은 동호로 해주시구요, 연락처는 010-111-2222입니다. 오늘저녁 10시 예약부탁드립니다!ㅎㅎ 감사해요~!',
        isNew: true,
        get sender() { return Model.user; },
        get receiver() { return Model.owner; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // messages: [this.message1, this.message2, this.message3],


      //===================================================================


      photo1: {
        id: 1200,
        name: '하나사진',
        url: 'img/_box200x200_orange.png',

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      photo2: {
        id: 1201,
        name: '두울사진',
        url: 'img/_box200x200_green.png',

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      photo3: {
        id: 1202,
        name: '세엣사진',
        url: 'img/_box200x200_sky.png',

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // photos: [this.photo1, this.photo2, this.photo3],


      //===================================================================


      place1: {
        id: 1300,
        name: '하나 술집 강남점',
        tagString: '태그1 태그2 태그3 태그4 태그5',
        tags: ['양주', '소주', '오렌지쥬스', '맛있는안주', '짱짱'],
        category: 'PREMIUM',  //PREMIUM, SPECIAL, NORMAL
        province: '강남',
        themes: ['헌팅', '데이트', '단체', '술마시기좋은', '안주가맛있는'],
        keywords: ['포차/호프', 'Pub', 'Bar/라운지', '이자카야', 'Beer', '와인', '전통주점', '퓨전주점', '룸식', '24시', '조용한', '편한의자', '내부화장실', '좌식', '흡연가능', '싸다'],
        averageRating: 4.8,
        viewCount: 3421,
        favoriteCount: 324,
        address: '서울 강남구 역삼동 123-234',
        geoJSON: geoJSON_example,
        hours: '오전 9시 ~ 오후 6시 1',
        size: '120석 1',
        summary: '안주가 맛있는 핫플레이스입니다. 환영합니다! 1',
        showDiscountTag: true,
        discountTitle: '50%할인! 1',
        discountContent: '50%할인을 해드리겠습니다. 많이많이오세요! 1',
        showEventTag: true,
        phone: '02-934-5713 1',
        get events() { return Model.events; },
        get reviewCount() { return Model.reviews.length; },
        get photos() { return Model.photos; },
        get reviews() { return Model.reviews; },
        get products() { return Model.products; },
        get favorites() { return Model.favorites; },
        get posts() { return Model.posts; }, // Not used but just incase

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      place2: {
        id: 1301,
        name: '두울 술집 역삼점',
        tagString: '태그2 태그2 태그3 태그4 태그5',
        tags: ['양주', '소주', '오렌지쥬스', '맛있는안주', '짱짱'],
        category: 'SPECIAL',  //PREMIUM, SPECIAL, NORMAL
        province: '강남',
        themes: ['헌팅', '데이트', '단체', '술마시기좋은', '안주가맛있는'],
        keywords: ['포차/호프', 'Pub', 'Bar/라운지', '이자카야', 'Beer', '와인', '전통주점', '퓨전주점', '룸식', '24시', '조용한', '편한의자', '내부화장실', '좌식', '흡연가능', '싸다'],
        averageRating: 3.8,
        viewCount: 3422,
        favoriteCount: 324,
        address: '서울 강남구 역삼동 223-234',
        geoJSON: geoJSON_example,
        hours: '오전 9시 ~ 오후 6시 2',
        size: '220석 2',
        summary: '안주가 맛있는 핫플레이스입니다. 환영합니다! 2',
        showDiscountTag: true,
        discountTitle: '50%할인! 2',
        discountContent: '50%할인을 해드리겠습니다. 많이많이오세요! 2',
        showEventTag: true,
        phone: '02-934-5723 2',
        get events() { return Model.events; },
        get reviewCount() { return Model.reviews.length; },
        get photos() { return Model.photos; },
        get reviews() { return Model.reviews; },
        get products() { return Model.products; },
        get favorites() { return Model.favorites; },
        get posts() { return Model.posts; }, // Not used but just incase

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      place3: {
        id: 1302,
        name: '세엣 술집 논현점',
        tagString: '태그3 태그2 태그3 태그4 태그5',
        tags: ['양주', '소주', '오렌지쥬스', '맛있는안주', '짱짱'],
        category: 'NORMAL',  //PREMIUM, SPECIAL, NORMAL
        province: '강남',
        themes: ['헌팅', '데이트', '단체', '술마시기좋은', '안주가맛있는'],
        keywords: ['포차/호프', 'Pub', 'Bar/라운지', '이자카야', 'Beer', '와인', '전통주점', '퓨전주점', '룸식', '24시', '조용한', '편한의자', '내부화장실', '좌식', '흡연가능', '싸다'],
        averageRating: 3.45555,
        viewCount: 3423,
        favoriteCount: 324,
        address: '서울 강남구 역삼동 323-234',
        geoJSON: geoJSON_example,
        hours: '오전 9시 ~ 오후 6시 3',
        size: '320석 3',
        summary: '안주가 맛있는 핫플레이스입니다. 환영합니다! 3',
        showDiscountTag: true,
        discountTitle: '50%할인! 3',
        discountContent: '50%할인을 해드리겠습니다. 많이많이오세요! 3',
        showEventTag: true,
        phone: '02-934-5733 3',
        get events() { return Model.events; },
        get reviewCount() { return Model.reviews.length; },
        get photos() { return Model.photos; },
        get reviews() { return Model.reviews; },
        get products() { return Model.products; },
        get favorites() { return Model.favorites; },
        get posts() { return Model.posts; }, // Not used but just incase

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // places: [this.place1, this.place2, this.place3],


      //===================================================================


      post1: {
        id: 1400,
        title: '퇴근하고 칵테일 한잔 하실분들 모집! 1',
        category: '자유톡',  // '자유톡', '연애톡', '번개톡', '유머톡', 'NOTICE', 'FAQ'
        showInTalk: true,  //익명여부
        content: '010-111-1111 으로 카톡주세요! 서울 강남역 5번출구에서 8시에 모입니다 ㅎㅎ 1',
        get commentCount() { return Model.comments.length; },
        get comments() { return Model.comments; },
        get photos() { return Model.photos; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      post2: {
        id: 1401,
        title: '퇴근하고 칵테일 한잔 하실분들 모집! 2',
        category: '연애톡',  // '자유톡', '연애톡', '번개톡', '유머톡', 'NOTICE', 'FAQ'
        showInTalk: false,  //익명여부
        content: '020-222-2222 으로 카톡주세요! 서울 강남역 5번출구에서 8시에 모입니다 ㅎㅎ 2',
        get commentCount() { return Model.comments.length; },
        get comments() { return Model.comments; },
        get photos() { return Model.photos; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      post3: {
        id: 1402,
        title: '퇴근하고 칵테일 한잔 하실분들 모집! 3',
        category: '자유톡',  // '자유톡', '연애톡', '번개톡', '유머톡', 'NOTICE', 'FAQ'
        showInTalk: true,  //익명여부
        content: '030-333-3333 으로 카톡주세요! 서울 강남역 5번출구에서 8시에 모입니다 ㅎㅎ 3',
        get commentCount() { return Model.comments.length; },
        get comments() { return Model.comments; },
        get photos() { return Model.photos; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      post4: {
        id: 1403,
        title: '공지입니다. 오늘은 정기정검 날입니다.',
        category: 'NOTICE',  // '자유톡', '연애톡', '번개톡', '유머톡', 'NOTICE', 'FAQ'
        showInTalk: true,  //익명여부
        content: '9시부터 6시까지 사용불가입니다~! 잠시만 기다려주세요!',
        get commentCount() { return Model.comments.length; },
        get comments() { return Model.comments; },
        get photos() { return Model.photos; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // posts: [this.post1, this.post2, this.post3],


      //===================================================================


      product1: {
        id: 1500,
        category: 'FOOD',  // FOOD / DRINK
        name: '생크림케잌 1',
        price: '13000원 1',  //Integer가 아니다.
        get place() { return Model.place1; },
        get photos() { return Model.photos; },  //  Not used just incase
        get reviews() { return Model.reviews; },  //  Not used just incase

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      product2: {
        id: 1501,
        category: 'DRINK',  // FOOD / DRINK
        name: '오렌지쥬스 2',
        price: '23000원 2',  //Integer가 아니다.
        get place() { return Model.place2; },
        get photos() { return Model.photos; },  //  Not used just incase
        get reviews() { return Model.reviews; },  //  Not used just incase

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      product3: {
        id: 1502,
        category: 'FOOD',  // FOOD / DRINK
        name: '고구마케잌 3',
        price: '33000원 3',  //Integer가 아니다.
        get place() { return Model.place3; },
        get photos() { return Model.photos; },  //  Not used just incase
        get reviews() { return Model.reviews; },  //  Not used just incase

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // products: [this.product1, this.product2, this.product3],


      //===================================================================


      review1: {
        id: 1700,
        rating: 5,
        content: '정말 맛있네요 대박집인듯 굳굳! 1',
        viewCount: 23,
        get photos() { return Model.photos; },
        get place() { return Model.place1; },
        get comment() { return Model.comment1; },
        get product() { return Model.product1; },  //  Not used

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      review2: {
        id: 1701,
        rating: 3,
        content: '별로네요 여기 분위기도 친절도도 노답 2',
        viewCount: 23,
        get photos() { return Model.photos; },
        get place() { return Model.place2; },
        get comment() { return Model.comment2; },
        get product() { return Model.product2; },  //  Not used

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.owner; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      review3: {
        id: 1702,
        rating: 4,
        content: '나쁘지않아요 괜찮은편이네요. 3',
        viewCount: 23,
        get photos() { return Model.photos; },
        get place() { return Model.place3; },
        get comment() { return Model.comment3; },
        get product() { return Model.product3; },  //  Not used

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.admin; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      // reviews: [this.review1, this.review2, this.review3],


      //===================================================================


      user: {
        id: 2000,
        username: '일반유저',
        email: 'aaa123@naver.com',
        nickname: '일반 aaa',
        get profilePhoto() { return Model.photo1; },
        get devices() { return Model.devices; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      owner: {
        id: 2001,
        username: '사장유저',
        email: 'bbb123@naver.com',
        nickname: '사장 bbb',
        get profilePhoto() { return Model.photo2; },
        get devices() { return Model.devices; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; }
      },
      admin: {
        id: 2002,
        username: '관리유저',
        email: 'ccc123@naver.com',
        nickname: '관리 ccc',
        get profilePhoto() { return Model.photo3; },
        get devices() { return Model.devices; },

        get createdAt() { return new Date(); },
        get updatedAt() { return new Date(); },
        get owner() { return Model.user; },
        get createdBy() { return Model.user; },
        get updatedBy() { return Model.user; },
        //owner: null, createdBy: null, updatedBy: null
      },


      //===================================================================


      //Controller에서 id를 넘겨주면 id로 검색해서 해당객체를 return함
      findOne: function (id) {
        for (var attr in this) {
          if (this[attr].id === id) {
            return this[attr];
          }
        }
      }


    };

    //this키워드는 먹히지 않는 모양이다... 이렇게 각각 초기화시켜주는 수 밖에 없다.
    Model.banners = [Model.banner1, Model.banner2, Model.banner3];
    Model.comments = [Model.comment1, Model.comment2, Model.comment3];
    Model.devices = [Model.device1, Model.device2, Model.device3];
    Model.events = [Model.event1, Model.event2, Model.event3];
    Model.favorites = [Model.favorite1, Model.favorite2, Model.favorite3];
    Model.likes = [Model.like1, Model.like2, Model.like3];
    Model.messages = [Model.message1, Model.message2, Model.message3, Model.message4, Model.message5];
    Model.photos = [Model.photo1, Model.photo2, Model.photo3];
    Model.places = [Model.place1, Model.place2, Model.place3];
    Model.posts = [Model.post1, Model.post2, Model.post3];
    Model.products = [Model.product1, Model.product2, Model.product3];
    Model.reviews = [Model.review1, Model.review2, Model.review3];

    return Model;
  }
})();