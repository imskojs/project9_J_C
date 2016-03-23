(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceDetailController', PlaceDetailController);

  PlaceDetailController.$inject = [
    '$ionicHistory', '$scope', '$state', '$ionicModal',
    'PlaceDetailModel', 'Util', 'Places', 'Reviews', 'Comments', 'Favorites', 'Message',
    'AppStorage'
  ];

  function PlaceDetailController(
    $ionicHistory, $scope, $state, $ionicModal,
    PlaceDetailModel, Util, Places, Reviews, Comments, Favorites, Message,
    AppStorage
  ) {
    var initPromise;
    var noLoadingStates = [
      'Main.GoogleMap',
      'Main.MessageCreate',
      'Main.MenuList'
    ];
    var noResetStates = ['Main.GoogleMap'];
    var vm = this;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    vm.Model = PlaceDetailModel;
    vm.getAverageRating = getAverageRating;
    vm.moreReview = moreReview;
    vm.reviewDelete = reviewDelete;
    vm.commentDelete = commentDelete;
    vm.favoriteCreate = favoriteCreate;
    vm.favoriteDestory = favoriteDestory;
    vm.expandPhoto = expandPhoto;
    vm.isModal = false; //true면 현재 모달창이 열려있는 상태
    vm.Model.selectedPhoto = null;
    vm.isNotFavorite = true;


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
            if (AppStorage.user) {
              vm.isNotFavorite = AppStorage.user.favorites.indexOf(vm.Model.place.id) === -1;
            }
            return restAPI({ place: $state.params.placeId }, {
                populate: ['photos', 'comments', 'owner'],
                limit: 30
              },
              Reviews,
              'find'
            );
          })
          .then((reviewsWrapper) => {
            return Util.bindData(reviewsWrapper, vm.Model, 'reviews');
          })
          .then(() => {
            console.log("vm.Model :::\n", vm.Model);
          })
          .catch((err) => {
            return console.log("err :::\n", err);
          });
      }
    }

    function onBeforeLeave(event, nextState) {
      if ($ionicHistory.currentStateName() !== nextState.name &&
        noResetStates.indexOf(nextState.name) === -1
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
    function moreReview() {

    }

    //====================================================
    //  Private
    //====================================================

    function init() {
      // let placePromise = find({id: $state.params.placeId}, null, Places, 'findOne');
      //$state.params.placeId 를 통해 Place를 findOne()
      return restAPI({ id: $state.params.placeId },
          null,
          Places,
          'findOne'
        )
        .then(obj => {
          return obj;
        });
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

    //view Review,
    function restAPI(extraQuery, extraOperation, Obj, method) {
      let queryWrapper = {
        query: {
          where: {},
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Obj[method](queryWrapper).$promise
        .then(obj => { //{id: 1300, name: 'asda' ... }
          console.log('쿼리 성공! ==> ', obj);
          return obj;
        });
    }

    // 유저 리뷰삭제 버튼 클릭
    function reviewDelete(id) {
      loadingByIdToggle(id);
      let queryWrapper = {
        query: {
          where: { id: id }
        }
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
        query: {
          where: { id: id }
        }
      };
      return Comments.destroyComment(queryWrapper.query.where).$promise
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
          loadingByIdToggle('FAVORITE');
          return favoritesWrapper;
        });
    }
  }
})();

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

// {
//   "isFirstTime": false,
//   "user": {
//     "roles": [
//       {
//         "name": "USER",
//         "active": true,
//         "createdAt": "2016-03-14T06:28:57.628Z",
//         "updatedAt": "2016-03-14T06:28:57.628Z",
//         "id": "56e65a29d392c84d9ab199b6"
//       }],
//     "owner": "56e8b6ae1f8c772be64f845e",
//     "username": "101185286",
//     "nickname": "고승훈",
//     "thumbnail_image": "http://mud-kage.kakao.co.kr/14/dn/btqcNGvK7U3/sgk4IX7U7Awp5w24iIEYVk/o.jpg",
//     "profile_image": "http://mud-kage.kakao.co.kr/14/dn/btqcNCfOQwt/zGemOQCiCmrWjC9ssWmed1/o.jpg",
//     "createdAt": "2016-03-16T01:28:14.569Z",
//     "updatedAt": "2016-03-16T03:58:15.916Z",
//     "id": "56e8b6ae1f8c772be64f845e",
//     "gravatarUrl": "https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
//     "favorites": { "favorites": ["56e7b8f44d057aa06ecce5aa", "56e66641d392c84d9ab19a71", "56e66ea6d392c84d9ab19a75", "56e67012d392c84d9ab19a7c"] }
//   },
//   "token": "P--6FcsLBdTBFf60_pACIECJkUyxRLqYmqwMLqwQQI0AAAFTfZLyIg",
//   "currentPosition": { "longitude": 127.04127619999998, "latitude": 37.5001058 },
//   "currentAddress": "서울특별시 강남구 역삼2동",
//   "gm0": { "lastCenter": { "lat": 37.497942, "lng": 127.027621 } }
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