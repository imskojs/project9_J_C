(function() {
  'use strict';
  angular.module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$state', '$q',
    '$ionicModal', '$ionicScrollDelegate',
    'ProfileModel', 'Users', 'Util', 'AppStorage', 'Upload', 'Photo', 'Message',
    'SERVER_URL'
  ];

  function ProfileController(
    _MockData,
    $ionicHistory, $scope, $state, $q,
    $ionicModal, $ionicScrollDelegate,
    TalkDetailModel, Users, Util, AppStorage, Upload, Photo, Message,
    SERVER_URL
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = TalkDetailModel;
    vm.logout = logout;
    vm.nicknameUpdate = nicknameUpdate;
    vm.profileImageUpdate = profileImageUpdate;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(vm.Model);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        initPromise
          .then(user => {
            Util.PhotoClass.pushToImages(vm.Model.images, user.profilePhoto);
            return Util.bindData(user, vm.Model, 'user');
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

    //====================================================
    //  Private
    //====================================================

    function init() {
      return userFindOne({ id: AppStorage.user.id })
        .then(user => {
          return user;
        });
    }

    function reset() {
      var Model = {
        handle: 'profile',
        loading: false,
        hopeNickname: '',

        user: {
          username: '',
          email: '',
          nickname: '',
          profilePhoto: {
            url: ''
          },
          devices: {},
          favorites: {},
          password_reset_code: '',
          password_reset_time: 0,
          accesscount: 0,
        },
      };
      angular.copy(Model, vm.Model);
    }

    function logout() {
      delete AppStorage.user;
      delete AppStorage.token;
      Util.goBack('forward');
    }

    //====================================================
    //  Modals
    //====================================================

    $ionicModal.fromTemplateUrl("state/Profile/Modal/NicknameUpdateModal.html", { //이 위치의 html내용을 모달로 사용
      scope: $scope, //옵션1
      animation: 'mh-slide' //옵션2
    }).then(function(modal) { //콜백
      vm.NicknameUpdateModal = modal;
    });

    //====================================================
    //  REST
    //====================================================

    function userFindOne(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
          populate: ['profilePhoto']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Users.findOne(queryWrapper).$promise
        .then((user) => {
          console.log("user :::\n", user);
          return user;
          // find()    ==> 반드시 Array를 리턴
          // findOne() ==> 반드시 Object를 리턴
        });
    }

    function nicknameUpdate(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          nickname: vm.Model.user.hopeNickname,
          id: AppStorage.user.id
        }
      };
      // angular.extend(queryWrapper.query.where, extraQuery);
      // angular.extend(queryWrapper.query, extraOperation);
      return Users.update(queryWrapper.query).$promise
        .then((user) => {
          console.log("user :::\n", user);
          Util.bindData(user, vm.Model, 'user');
          AppStorage.user = user;
          console.log("AppStorage.user :::\n", AppStorage.user);
          vm.NicknameUpdateModal.hide();
          // $state.reload();
          return user;
          //David Seunghoon Ko
          // find()    ==> 반드시 Array를 리턴
          // findOne() ==> 반드시 Object를 리턴
        });
    }


    //----------------------------------------------------


    // 프로필사진 클릭
    function profileImageUpdate() {
      // getPhoto
      return Photo.get('camera', 800, true, 600, 'square')
        .then((blob) => { //photo return
          // vm.Model.images.push(blob);
          vm.Model.images[0] = blob;
          Message.loading();
          return createPhotos();
        })
        .then((idsWrapper) => { //createdPhoto
          console.log("idsWrapper :::\n", idsWrapper);
          if (!idsWrapper) {
            return false;
          }
          let ids = idsWrapper.ids; //photo의 id
          let photos = Util.PhotoClass.createPhotoIds(vm.Model.images, vm.Model.user.profilPhoto, ids);
          vm.Model.user.profilePhoto = photos[0]; // [photo] 1개짜리 array
        })
        .then(() => {
          return Users.update({
            profilePhoto: vm.Model.user.profilePhoto,
            id: AppStorage.user.id
          });
        })
        .then((user) => {
          Message.hide();
          AppStorage.user = user;
          // $state.reload();
        })
        .catch((err) => {
          console.log("err :::\n", err);
          Util.error(err);
        });

    }


    function createPhotos() {
      Util.PhotoClass.processCreate(vm.Model.images, vm.Model.create, vm.Model.files);
      Util.PhotoClass.processDestroy(vm.Model.images, vm.Model.destroy, vm.Model.user.profilePhoto);
      let uploadOptions = {
        url: SERVER_URL + '/photo/updatePhotos',
        method: 'POST',
        file: vm.Model.files,
        fields: {
          query: {
            create: vm.Model.create,
            destroy: vm.Model.destroy
          }
        },
        headers: {
          enctype: "multipart/form-data"
        }
      };
      let promise = Upload.upload(uploadOptions);
      return promise
        .then((dataWrapper) => { //return createdPhoto
          console.log("dataWrapper --createPhotos-- :::\n", dataWrapper);
          let idsWrapper = dataWrapper.data;
          return idsWrapper;
        });
    }

  }
})();