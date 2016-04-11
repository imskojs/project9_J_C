(function() {
  'use strict';
  angular.module('app')
    .controller('TalkCreateController', TalkCreateController);

  TalkCreateController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q', '$state', '$ionicModal',
    'TalkCreateModel', 'Util', 'RootScope', 'Posts', 'Photo',
    'Upload', 'Message',
    'SERVER_URL'
  ];

  function TalkCreateController(
    _MockData,
    $ionicHistory, $scope, $q, $state, $ionicModal,
    TalkCreateModel, Util, RootScope, Posts, Photo,
    Upload, Message,
    SERVER_URL
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = TalkCreateModel;
    vm.isAnnonymousToggle = isAnnonymousToggle;
    vm.categoryToggle = categoryToggle;
    vm.selectCategory = selectCategory;
    // vm.updateTalk = updateTalk;
    vm.getPhoto = getPhoto;
    vm.create = create;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    $ionicModal.fromTemplateUrl('state/0Template/CameraOrGalleryModal.html', {
      scope: $scope,
      animation: 'mh-slide'
    }).then(function(modal) {
      vm.CameraOrGalleryModal = modal;
    });

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      console.log("$state.params :::\n", $state.params);
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(vm.Model);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      // Util.freeze(false);
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

    function isAnnonymousToggle() {
      if (vm.Model.post.isAnnonymous) {
        vm.Model.post.isAnnonymous = false; //실명으로
      } else {
        vm.Model.post.isAnnonymous = true; //익명으로
      }
    }

    function categoryToggle() {
      if (vm.Model.categoryToggle) {
        vm.Model.categoryToggle = false;
      } else {
        vm.Model.categoryToggle = true;
      }
    }

    function selectCategory(category) {
      vm.Model.post.category = category;

      //if (사진이 선택되었을 경우)
      //사진의 경로(디바이스의 경로?)를 Model의 Array에 push
    }

    // 카메라 버튼 클릭
    function getPhoto(cameraOrGallery) {
      if (vm.Model.images.length >= 5) {
        Message.alert('사진수 초과', '사진은 최대 5개 까지만 업로드 가능합니다.');
        return false;
      }
      return Photo.get(cameraOrGallery, 800, true, 600, 'square')
        .then((blob) => {
          // console.log("blob :::\n", blob);
          vm.CameraOrGalleryModal.hide();
          vm.Model.images.push(blob);
        })
        .catch((err) => {
          console.log("err :::\n", err);
        });
    }

    // 글쓰기 버튼 클릭
    function create() {
      if (!validationCheck()) {
        return;
      }
      Message.loading();
      return createPhotos()
        .then((idsWrapper) => {
          console.log("idsWrapper :::\n", idsWrapper);
          if (!idsWrapper) {
            return false;
          }
          let ids = idsWrapper.ids;
          let photos = Util.PhotoClass.createPhotoIds(vm.Model.images, vm.Model.post.photos, ids);
          vm.Model.post.photos = photos;
        })
        .then(() => {
          return reviewCreateReview();
        })
        .then((post) => {
          console.log("post :::\n", post);
          return Message.alert("글 등록 알림", "게시물이 성공적으로 등록되었습니다.");
        })
        .then(() => {
          Util.goBack();
        })
        .catch((err) => {
          Util.error(err);
        });
    }

    //====================================================
    //  Private
    //====================================================

    function init() {}

    function reset() {
      var Model = {
        loading: false,
        categoryToggle: false,
        images: [],
        files: [],
        create: [],
        tempFiles: [],
        destroy: [],
        post: {
          title: '',
          category: '',
          isAnnonymous: false, //false는 실명, true는 익명
          content: '',
          photos: [],
          showInTalk: true //false이면 공지글, true이면 일반게시글
        }
      };
      angular.copy(Model, vm.Model);
    }

    function validationCheck() {
      if (!vm.Model.post.category) {
        Message.alert('알림', '카테고리를 선택해주세요.');
        return false;
      }
      if (!vm.Model.post.title) {
        Message.alert('알림', '제목을 입력해주세요.');
        return false;
      }
      if (!vm.Model.post.content) {
        Message.alert('알림', '내용을 입력해주세요.');
        return false;
      }
      return true;
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
          console.log("dataWrapper --createPhotos-- :::\n", dataWrapper);
          let idsWrapper = dataWrapper.data;
          return idsWrapper;
        });
    }

    function reviewCreateReview(extraQuery) {
      let queryWrapper = {
        query: vm.Model.post
      };
      angular.extend(queryWrapper.query, extraQuery);
      console.log("queryWrapper --reviewCreateReview-- :::\n", queryWrapper);
      return Posts.create(null, queryWrapper).$promise
        .then((createdPost) => {
          console.log("createdPost :::\n", createdPost);
          return createdPost;
        });
    }

    // 글쓰기 버튼 클릭
    function updateTalk() {
      console.log("vm.Model :::\n", vm.Model);
      let queryWrapper = {
        query: vm.Model.post
      };

      Posts.create(null, queryWrapper).$promise
        .then(createdPost => {
          console.log("createdPost :::\n", createdPost);
          reset();
          return RootScope.goToState('Main.Footer.TalkList', {}, 'forward');
        })
    }

  }
})();