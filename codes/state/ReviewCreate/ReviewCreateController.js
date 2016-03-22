(function() {
  'use strict';
  angular.module('app')
    .controller('ReviewCreateController', ReviewCreateController);

  ReviewCreateController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q', '$state',
    'ReviewCreateModel', 'Util', 'RootScope', 'Places', 'Reviews', 'Photo',
    'Upload', 'Message',
    'SERVER_URL'
  ];

  function ReviewCreateController(
    _MockData,
    $ionicHistory, $scope, $q, $state,
    ReviewCreateModel, Util, RootScope, Places, Reviews, Photo, Upload, Message,
    SERVER_URL

  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = ReviewCreateModel;


    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    vm.setRating = setRating;
    vm.getPhoto = getPhoto;
    vm.create = create;

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        // Util.loading(vm.Model);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then((message) => {
            console.log("message :::\n", message);
            Util.freeze(false);
          })
          .catch((err) => {
            Util.error(err);
          });
      } else {
        Util.freeze(false);
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
    function getPhoto() {
      if (vm.Model.images.length >= 5) {
        Message.alert('사진수 초과', '사진은 최대 5개 까지만 업로드 가능합니다.');
        return false;
      }
      return Photo.get('camera', 800, true, 600, 'square')
        .then((blob) => {
          vm.Model.images.push(blob);
        })
        .catch((err) => {
          console.log("err :::\n", err);
        });
    }

    function create() {
      Message.loading();
      return createPhotos()
        .then((idsWrapper) => {
          if (!idsWrapper) {
            return false;
          }
          let ids = idsWrapper.ids;
          let photos = Util.PhotoClass.createPhotoIds(vm.Model.images, vm.Model.review.photos, ids);
          vm.Model.review.photos = photos;
        })
        .then(() => {
          return reviewCreateReview();
        })
        .then((review) => {
          console.log("review :::\n", review);
          return Message.alert("리뷰 등록 알림", "리뷰가 성공적으로 등록되었습니다.");
        })
        .then(() => {
          Util.goBack();
        })
        .catch((err) => {
          Util.error(err);
        });
    }

    function setRating(rating) {
      vm.Model.review.rating = rating;
      console.log("vm.Model.review.rating :::\n", vm.Model.review.rating);
    }

    //====================================================
    //  Private
    //====================================================
    function init() {
      return $q.resolve({
        message: 'empty'
      });
    }

    function reset() {
      let defaultObj = {
        loading: false,
        review: {
          rating: 5,
          content: '',
          place: '',
          photos: []
        },
        images: [],
        tempFiles: [],
        files: [],
        create: [],
        destroy: []
      };
      angular.copy(defaultObj, vm.Model);
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================
    function createPhotos() {
      Util.PhotoClass.processCreate(vm.Model.images, vm.Model.create, vm.Model.files);
      let uploadOptions = {
        url: SERVER_URL + '/photo/createPhotos',
        method: 'POST',
        file: vm.Model.files,
        fields: {
          query: {
            create: vm.Model.create
          }
        },
        headers: {
          enctype: "multipart/form-data"
        }
      };
      let promise = Upload.upload(uploadOptions);
      return promise
        .then((dataWrapper) => {
          let idsWrapper = dataWrapper.data;
          return idsWrapper;
        });
    }

    function reviewCreateReview(extraQuery) {
      vm.Model.review.place = $state.params.placeId;
      let queryWrapper = {
        query: vm.Model.review
      };
      angular.extend(queryWrapper.query, extraQuery);
      console.log("queryWrapper --reviewCreateReview-- :::\n", queryWrapper);
      return Reviews.createReview(queryWrapper).$promise
        .then((review) => {
          return review;
        });
    }

  } // end
})();

// RootScope.goToState('Main.PlaceDetail', {
//   placeId: vm.Model.review.place.id
// }, 'forward');