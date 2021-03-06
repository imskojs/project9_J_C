(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceDetailController', PlaceDetailController);

  PlaceDetailController.$inject = [
    '$ionicHistory', '$scope', '$state', '$ionicModal',
    'PlaceDetailModel', 'Util', 'Places', 'Reviews', 'Comments', 'Favorites', 'Message', 'RootScope',
    'AppStorage'
  ];

  function PlaceDetailController(
    $ionicHistory, $scope, $state, $ionicModal,
    PlaceDetailModel, Util, Places, Reviews, Comments, Favorites, Message, RootScope,
    AppStorage
  ) {
    var initPromise;
    var noLoadingStates = [
      // 'Main.GoogleMap',
      // 'Main.MessageCreate',
      // 'Main.MenuList',
      // 'Main.RequestUpdate'
    ];
    // var noResetStates = ['Main.GoogleMap'];
    var vm = this;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.afterLeave', onBeforeLeave);
    // $scope.$on('$stateChangeStart', onBeforeLeave);

    vm.Model = PlaceDetailModel;
    vm.getAverageRating = getAverageRating;
    vm.loadMoreReviews = loadMoreReviews;
    vm.reviewDelete = reviewDelete;
    vm.commentDelete = commentDelete;
    vm.favoriteCreate = favoriteCreate;
    vm.favoriteDestory = favoriteDestory;
    vm.expandPhoto = expandPhoto;
    vm.isModal = false; //true면 현재 모달창이 열려있는 상태
    vm.Model.selectedPhoto = null;
    vm.isNotFavorite = true;
    vm.goMessageCreate = goMessageCreate;


    $ionicModal.fromTemplateUrl('state/PlaceDetail/Modal/ExpandPhotoModal.html', {
      scope: $scope,
      animation: 'mh-slide'
    }).then(function(modal) {
      vm.ExpandPhotoModal = modal;
    });

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(vm.Model);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(place => { //{id: 1300, name: 'asda' ... }
            return Util.bindData(place, vm.Model, 'place'); //Model['place'] = place
          })
          .then(() => {
            return reviewFind();
          })
          .then((reviewsWrapper) => {
            return Util.bindData(reviewsWrapper, vm.Model, 'reviews');
          })
          .then(() => {
            console.log("vm.Model :::\n", vm.Model);
            if (AppStorage.user) {
              vm.isNotFavorite = AppStorage.user.favorites.indexOf(vm.Model.place.id) === -1;
            }
          })
          .catch((err) => {
            return console.log("err :::\n", err);
          });
      }
    }

    function onBeforeLeave(event, nextState) {
      if ($ionicHistory.currentStateName() !== nextState.name &&
        noLoadingStates.indexOf(nextState.name) === -1
      ) {
        return reset();
      }
    }

    //====================================================
    //  VM
    //====================================================

    function getAverageRating(num) {
      var roundNum = Math.round(num);
      var array = [];
      for (var i = 0; i < roundNum; i++) {
        array.push(i);
      }
      return array;
    }

    //리뷰 더보기 버튼 클릭
    function loadMoreReviews() {
      let last = vm.Model.reviews.length - 1;
      if (last < 0) {
        return Message.alert('리뷰 더보기 알림', '더이상의 리뷰가 없습니다.');
      }
      return reviewFind({
          '<': { id: vm.Model.reviews[last] }
        }, {
          limit: 30
        })
        .then((reviewsWrapper) => {
          if (reviewsWrapper.reviews.length === 0) {
            return Message.alert('리뷰 더보기 알림', '더이상의 리뷰가 없습니다.');
          }
          return Util.appendData(reviewsWrapper, vm.Model, 'reviews');
        })
        .then(() => {
          console.log("vm.Model.reviews :::\n", vm.Model.reviews);
        })
        .catch((err) => {
          return Util.error(err);
        });
    }

    function goMessageCreate() {
      if ( RootScope.needLogin() ) {
        if (vm.Model.place.category === 'NORMAL') {
          Message.alert('알림', '일반등록업체는 쪽지기능을 지원하지 않습니다.');
          return;
        }
        if (vm.Model.place.owner === AppStorage.user.id) {
          Message.alert('알림', '사장님께서는 "1:1쪽지 모아보기" 기능을 이용해주세요.');
          return;
        }
        RootScope.goToState(
          'Main.MessageCreate', {
            ownerId: vm.Model.place.owner,
            receiverName: vm.Model.place.name
        }, 'forward');
      }
      //Message.alert('알림', '로그인을 해주세요.');
      return;
    }

    //====================================================
    //  Private
    //====================================================

    function init() {
      return placeFindOne();
    }

    function reset() {
      let defaultObj = {
        handle: 'place-detail',
        loading: false,
        isNotFavorite: true,

        loadingById: [],
        commentDestroyLoading: false,
        place: {},
        reviews: [],
        comments: [],
      };
      angular.copy(defaultObj, vm.Model);
    }

    function loadingByIdToggle(id) {
      let index = vm.Model.loadingById.indexOf(id);
      if (index === -1) {
        vm.Model.loadingById.push(id);
        console.log('로딩중...' + id);
      } else {
        console.log('로딩완료...' + id);
        vm.Model.loadingById.splice(index, 1);
      }
    }

    function expandPhoto(photo) {
      vm.Model.selectedPhoto = photo;
      if (vm.isModal) { //모달이 열려있으면
        vm.isModal = false;
        vm.ExpandPhotoModal.hide();
      } else { //모달이 닫혀있으면
        vm.isModal = true;
        vm.ExpandPhotoModal.show();
      }
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function placeFindOne(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {
            id: $state.params.placeId
          },
          populate: [{ property: 'photos', criteria: { sort: 'index ASC' } }]
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Places.findOne(queryWrapper).$promise
        .then((placesWrapper) => {
          return placesWrapper;
        });
    }

    // return restAPI({ place: $state.params.placeId }, {populate: [{property: 'photos', criteria: {sort: 'index ASC'} }, 'comments', 'owner'], limit: 30 }, Reviews, 'find');

    function reviewFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {
            place: $state.params.placeId,
          },
          limit: 5,
          sort: 'id DESC',
          populate: [
            { property: 'photos', criteria: { sort: 'index ASC' } },
            { property: 'comments', criteria: { sort: 'id DESC' } },
            'owner'
          ]
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Reviews.find(queryWrapper).$promise
        .then((reviewsWrapper) => {
          return reviewsWrapper;
        });
    }

    // 유저 리뷰삭제 버튼 클릭
    function reviewDelete(id) {
      loadingByIdToggle(id);
      let queryWrapper = {
        id: id,
        owner: AppStorage.user && AppStorage.user.id
      };
      return Reviews.destroyReview(queryWrapper).$promise
        .then(reviewsWrapper => {
          // console.log("reviewsWrapper :::\n", reviewsWrapper);
          // Util.bindData(reviewsWrapper, vm.Model, 'reviews');
          loadingByIdToggle(id);
          $state.reload();
        });
    }

    // 사장님 댓글삭제 버튼 클릭
    function commentDelete(id) {
      loadingByIdToggle(id);
      let queryWrapper = {
        id: id,
        owner: AppStorage.user && AppStorage.user.id
      };
      return Comments.destroyComment(queryWrapper).$promise
        .then(commentsWrapper => {
          // console.log("commentsWrapper :::\n", commentsWrapper);
          // Util.bindData(commentsWrapper, vm.Model, 'comments');
          loadingByIdToggle(id);
          return $state.reload();
        });
    }

    function favoriteCreate() {
      if (!AppStorage.user) {
        Message.alert('즐겨찾기', '로그인을 해주세요.');
        return;
      }
      loadingByIdToggle('FAVORITE');
      console.log('즐겨찾기 추가');
      let queryWrapper = {
        query: {
          place: $state.params.placeId
        }
      };
      return Favorites.createPlace(queryWrapper).$promise
        .then(favoritesWrapper => {
          console.log("favoritesWrapper :::\n", favoritesWrapper);
          AppStorage.user.favorites = favoritesWrapper.favorites; //["fsea3", "edsa32"]
          console.log("AppStorage.user.favorites :::\n", AppStorage.user.favorites);
          vm.isNotFavorite = AppStorage.user.favorites.indexOf($state.params.placeId) === -1;
          //있으면(즐겨찾기중이면) false
          //없으면(즐겨찾기 제거하면) true
          Message.alert('알림', '즐겨찾기에 추가되었습니다.');
          loadingByIdToggle('FAVORITE');
          return favoritesWrapper;
        });
    }

    function favoriteDestory() {
      loadingByIdToggle('FAVORITE');
      console.log('즐겨찾기 제거');
      return Favorites.destroy({
          place: $state.params.placeId,
          owner: AppStorage.user && AppStorage.user.id
        }).$promise
        .then(favoritesWrapper => {
          console.log("favoritesWrapper :::\n", favoritesWrapper);
          AppStorage.user.favorites = favoritesWrapper.favorites;
          vm.isNotFavorite = AppStorage.user.favorites.indexOf($state.params.placeId) === -1;
          //있으면(즐겨찾기중이면) false
          //없으면(즐겨찾기 제거하면) true
          Message.alert('알림', '즐겨찾기에서 제거되었습니다.');
          loadingByIdToggle('FAVORITE');
          return favoritesWrapper;
        });
    }
  }
})();

// 미로그인 : {"isFirstTime":false,"currentPosition":{"longitude":127.04120549999998,"latitude":37.5001295},"currentAddress":"서울특별시 강남구 역삼2동","gm0":{"lastCenter":{"lat":37.497942,"lng":127.027621}}}

// 동호 : {"isFirstTime":false,"currentPosition":{"longitude":127.0412141,"latitude":37.5000636},"currentAddress":"서울특별시 강남구 역삼2동","user":{"roles":[{"name":"USER","active":true,"createdAt":"2016-03-22T08:06:46.723Z","updatedAt":"2016-03-22T08:06:46.723Z","id":"56f0fd165f9374c7fc0371bd"}],"favorites":["56f0fe8d5f9374c7fc037277"],"profilePhoto":{"public_id":"w7b8q8lvbiqnul23gqis","version":1459149451,"signature":"afd78b82e3bc177cd67d9789f6d72e7cd9d03e66","width":600,"height":600,"format":"png","resource_type":"image","created_at":"2016-03-28T07:17:31Z","tags":["JOODANG"],"bytes":306102,"type":"upload","etag":"adf02f0c62f78aadca078b9e6fd10c20","url":"http://res.cloudinary.com/appdev/image/upload/v1459149451/w7b8q8lvbiqnul23gqis.png","secure_url":"https://res.cloudinary.com/appdev/image/upload/v1459149451/w7b8q8lvbiqnul23gqis.png","original_filename":"c833fe23-1b28-4c9d-9d23-d212d693335a","createdBy":"56f10b17eb57050e3d41bc06","updatedBy":"56f10b17eb57050e3d41bc06","owner":"56f10b17eb57050e3d41bc06","index":0,"createdAt":"2016-03-28T07:16:00.144Z","updatedAt":"2016-03-28T07:16:00.144Z","id":"56f8da30ab2facd12b70faa9"},"owner":"56f10b17eb57050e3d41bc06","username":"94322116","nickname":"Rex","thumbnail_image":"http://mud-kage.kakao.co.kr/14/dn/btqcMcBxfpK/kzSPZslsuzMGjQ1qSIGvok/o.jpg","profile_image":"http://mud-kage.kakao.co.kr/14/dn/btqcL9EPhUa/OymItKoYOCDD9dW1sQ0XJk/o.jpg","createdAt":"2016-03-22T09:06:31.326Z","updatedAt":"2016-04-04T03:05:56.169Z","id":"56f10b17eb57050e3d41bc06","gravatarUrl":"https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"},"token":"_1MvEfjI5oXdKfuVSLUVDJW22QiGyZS7AnHHeqwQTJgAAAFT3z13xQ"}

// 고승훈팀장님 : {"isFirstTime":false,"user":{"roles":[{"name":"USER","active":true,"createdAt":"2016-03-14T06:28:57.628Z","updatedAt":"2016-03-14T06:28:57.628Z","id":"56e65a29d392c84d9ab199b6"}],"owner":"56e8b6ae1f8c772be64f845e","username":"101185286","nickname":"고승훈","thumbnail_image":"http://mud-kage.kakao.co.kr/14/dn/btqcNGvK7U3/sgk4IX7U7Awp5w24iIEYVk/o.jpg","profile_image":"http://mud-kage.kakao.co.kr/14/dn/btqcNCfOQwt/zGemOQCiCmrWjC9ssWmed1/o.jpg","createdAt":"2016-03-16T01:28:14.569Z","updatedAt":"2016-03-16T03:58:15.916Z","id":"56e8b6ae1f8c772be64f845e","gravatarUrl":"https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e","favorites":{"favorites":["56e7b8f44d057aa06ecce5aa","56e66641d392c84d9ab19a71","56e66ea6d392c84d9ab19a75","56e67012d392c84d9ab19a7c"]}},"token":"P--6FcsLBdTBFf60_pACIECJkUyxRLqYmqwMLqwQQI0AAAFTfZLyIg","currentPosition":{"longitude":127.04127619999998,"latitude":37.5001058},"currentAddress":"서울특별시강남구역삼2동","gm0":{"lastCenter":{"lat":37.497942,"lng":127.027621}}}


// {//   "isFirstTime": false,
//   "user": {
//     "roles": [{
//       "name": "USER",
//       "active": true,
//       "createdAt": "2016-03-14T06:28:57.628Z",
//       "updatedAt": "2016-03-14T06:28:57.628Z",
//       "id": "56e65a29d392c84d9ab199b6"
//     }],
//     "owner": "56e8ba6d1f8c772be64f8461",
//     "username": "940191342763462",
//     "firstname": null,
//     "lastname": null,
//     "nickname": "David Seunghoon Ko",
//     "profile_image": "http://graph.facebook.com/940191342763462/picture",
//     "createdAt": "2016-03-16T01:44:13.394Z",
//     "updatedAt": "2016-03-16T04:17:56.245Z",
//     "id": "56e8ba6d1f8c772be64f8461",
//     "gravatarUrl": "https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
//     "favorites": { "favorites": ["56e7b8f44d057aa06ecce5aa", "56e67012d392c84d9ab19a7c"] }
//   },
//   "token": "CAAGpjZAKzNvcBAExU9XPhff4Yz0EFRrVm5FoHPg6mMSxbkTZBi3taVWirmbHXPIznQ4OwBlqXMBCHRyyycQHaeZBIQWDZBfRQUob2gQt0XP07nVJWqRGGF9ZBpIZAntZChKYIFE4Eeitu6SWCoX9ybLfARjeIWTF7vS4Y29xrX36U77nMKQoJXATzYR6WNRZCFcZD",
//   "currentPosition": { "longitude": 127.04128370000001, "latitude": 37.5001021 },
//   "currentAddress": "서울특별시 강남구 역삼2동"
// }

/*
{
  "isFirstTime": false,
  "user": {
    "roles": [{
      "name": "USER",
      "active": true,
      "createdAt": "2016-03-14T06:28:57.628Z",
      "updatedAt": "2016-03-14T06:28:57.628Z",
      "id": "56e65a29d392c84d9ab199b6"
  }],
    "owner": "56e8b6ae1f8c772be64f845e",
    "username": "101185286",
    "nickname": "고승훈",
    "thumbnail_image": "http://mud-kage.kakao.co.kr/14/dn/btqcNGvK7U3/sgk4IX7U7Awp5w24iIEYVk/o.jpg",
    "profile_image": "http://mud-kage.kakao.co.kr/14/dn/btqcNCfOQwt/zGemOQCiCmrWjC9ssWmed1/o.jpg",
    "createdAt": "2016-03-16T01:28:14.569Z",
    "updatedAt": "2016-03-16T03:58:15.916Z",
    "id": "56e8b6ae1f8c772be64f845e",
    "gravatarUrl": "https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"
  },
  "token": "P--6FcsLBdTBFf60_pACIECJkUyxRLqYmqwMLqwQQI0AAAFTfZLyIg",
  "currentPosition": {
    "longitude": 127.04127619999998,
    "latitude": 37.5001058
  },
  "currentAddress": "서울특별시 강남구 역삼2동"
}
*/