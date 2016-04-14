(function() {
  'use strict';
  angular.module('app')
    .controller('TalkUpdateController', TalkUpdateController);

  TalkUpdateController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q', '$state', '$ionicModal',
    'TalkUpdateModel', 'Util', 'RootScope', 'Posts', 'Photo',
    'Upload', 'Message',
    'SERVER_URL'
  ];

  function TalkUpdateController(
    _MockData,
    $ionicHistory, $scope, $q, $state, $ionicModal,
    TalkUpdateModel, Util, RootScope, Posts, Photo,
    Upload, Message,
    SERVER_URL
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = TalkUpdateModel;
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
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      initPromise
        .then(post => {
          return Util.bindData(post, vm.Model, 'post');
        })
        .then(() => {
          vm.Model.images = vm.Model.post.photos;
          console.log("vm.Model :::\n", vm.Model);
        });
      Util.freeze(false);
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
      vm.CameraOrGalleryModal.hide();
      if (vm.Model.images.length >= 5) {
        Message.alert('사진수 초과', '사진은 최대 5개 까지만 업로드 가능합니다.');
        return false;
      }
      return Photo.get(cameraOrGallery, 800, true, 600, 'square')
        .then((blob) => {
          // console.log("blob :::\n", blob);
          vm.Model.images.push(blob);
        })
        .catch((err) => {
          console.log("err :::\n", err);
        });
    }

    // 수정하기 버튼 클릭
    function create() {
      console.log('111 aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      Message.loading();
      console.log('111 bbbbbbbbbbbbbbbbbbbbbbbbbbbb');
      return createPhotos()
        .then((idsWrapper) => {
          console.log("idsWrapper :::\n", idsWrapper);
          console.log("111 ggggggggggggggggggg");
          if (!idsWrapper) {
            return false;
          }
          let ids = idsWrapper.ids;
          let photos = Util.PhotoClass.createPhotoIds(vm.Model.images, vm.Model.post.photos, ids);
          console.log("111 hhhhhhhhhhhhhhhhhhhhhhhhhhh");
          vm.Model.post.photos = photos;
        })
        .then(() => {
          return reviewUpdateReview();
        })
        .then((post) => {
          console.log("post :::\n", post);
          return Message.alert("글 수정 알림", "게시물이 성공적으로 수정되었습니다.");
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

    function init() {
      return postFindOne({ id: $state.params.postId })
        .then(post => {
          return post;
        });
    }

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

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function postFindOne(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
          sort: {},
          populate: ['photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.findOne(queryWrapper).$promise
        .then((post) => {
          console.log("post :::\n", post);
          // {id:101, name:'aaa'}
          return post;
        });
    }

    function createPhotos() {
      console.log("111 cccccccccccccccccccccccccccc");
      Util.PhotoClass.processCreate(vm.Model.images, vm.Model.create, vm.Model.files);
      console.log("111 ddddddddddddddddddddddddddd");
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
      console.log("111 eeeeeeeeeeeeeeeeeeeeeeee");
      return promise
        .then((dataWrapper) => {
          console.log("111 ffffffffffffffff");
          console.log("dataWrapper --createPhotos-- :::\n", dataWrapper);
          let idsWrapper = dataWrapper.data;
          return idsWrapper;
        });
    }

    function reviewUpdateReview(extraQuery) {
      let queryWrapper = {
        query: vm.Model.post
      };
      angular.extend(queryWrapper.query, extraQuery);
      console.log("111 iiiiiiiiiiiiiiiii");
      console.log("queryWrapper --reviewUpdateReview-- :::\n", queryWrapper);
      return Posts.update(null, queryWrapper).$promise
        .then((updatedPost) => {
          console.log("updatedPost :::\n", updatedPost);
          return updatedPost;
        });
    }

    // 글쓰기 버튼 클릭
    function updateTalk() {
      console.log("vm.Model :::\n", vm.Model);
      let queryWrapper = {
        query: vm.Model.post
      };

      Posts.create(null, queryWrapper).$promise
        .then(updatedPost => {
          console.log("updatedPost :::\n", updatedPost);
          reset();
          return RootScope.goToState('Main.Footer.TalkList', {}, 'forward');
        })
    }

  }
})();