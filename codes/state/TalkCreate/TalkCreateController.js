(function() {
  'use strict';
  angular.module('app')
    .controller('TalkCreateController', TalkCreateController);

  TalkCreateController.$inject = [
    '_MockData',
    '$scope', '$q', '$state',
    'TalkCreateModel', 'Util', 'RootScope', 'Posts'
  ];

  function TalkCreateController(
    _MockData,
    $scope, $q, $state,
    TalkCreateModel, Util, RootScope, Posts
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = TalkCreateModel;
    vm.isAnnonymousToggle = isAnnonymousToggle;
    vm.categoryToggle = categoryToggle;
    vm.selectCategory = selectCategory;
    vm.updateTalk = updateTalk;
    vm.camera = camera;
    vm.photoDelete = photoDelete;
    var photoIndex = 0;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      console.log("$state.params :::\n", $state.params);
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(TalkCreateModel);
        initPromise = init();
        //2개의 array Promise가 들어있는 Promise array 를 initPromise 변수에 대입
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      initPromise
        .then((post) => {
          // let noticePostsWrapper = array[0];  //공지
          // let normalPostsWrapper = array[1];  //일반 주당톡
          // TalkCreateModel.posts = noticePostWrapper.posts;  //바인딩 되는것은 이거나 아래나 똑같지만,
          // Util.bindData(postsWrapper, TalkCreateModel, 'posts');  //content 안에서 refresh 하는듯한 로직이 담겨있다.
          // console.log("TalkCreateModel :::\n", TalkCreateModel);
        })
          /*  bindData(data, model, name, emitPostTrue, loadingModel)
              "data를 이 model에 넣는다, name이라는 attribute를 만들고" 라고 해석해면 될듯.
              model[name] = data;
              model[name] = data[name];  3번째 인자의 끝이 s로 끝나는경우
              ==> Model.posts = PostWrapper
              ==> Model.posts = PostWrapper.posts  */
      TalkCreateModel.post = _MockData.findOne($state.params.postId);
      console.log("TalkCreateModel :::\n", TalkCreateModel);
      Util.freeze(false);
    }

    function onBeforeLeave() {
      return reset();
    }


    //====================================================
    //  VM
    //====================================================

    function isAnnonymousToggle () {
      if (vm.Model.post.isAnnonymous) {
        vm.Model.post.isAnnonymous = false;
      } else {
        vm.Model.post.isAnnonymous = true;
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

    function camera() {
      //implementation
      //사진을 선택하면 vm.Model.photos.push(photo)
      photoIndex++;
      //삭제를 위한 index
    }

    function photoDelete() {
      //implementation
      //클릭하면 vm.Model.photos.splice(index, 1);
      photoIndex--;
    }

    function goToState(state, params, direction, messageTitle, messageContent) {
      if (!AppStorage.token) {
        return Message.alert(messageTitle, messageContent);
      }
      RootScope.goToState(state, params, direction);
    }

    //====================================================
    //  Private
    //====================================================

    function init() {  //서버에서 data를 가져오는 작업을 진행함.
      return postFind( {id: $state.params.postId} );
    }

    function reset() {
      vm.Model.post.category = '';
      vm.Model.post.isAnnonymous = true;  //true이면 보이기, false면 익명
      vm.Model.post.title = '';
      vm.Model.post.content = '';
      vm.Model.post.photos = [];
    }

    //====================================================
    //  Modals
    //====================================================

    //====================================================
    //  REST
    //====================================================

    function postFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
          sort: {},
          populate: ['photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.find(queryWrapper).$promise
        .then((post) => {
          console.log("post :::\n", post);
          // {id:101, name:'aaa'}
          return post;
        });
    }

    // 수정하기 버튼 클릭
    function updateTalk() {
      console.log("$state.params.postId ==> ", $state.params.postId);
      console.log("vm.Model.post.category ==> ", vm.Model.post.category);
      console.log("vm.Model.post.isAnnonymous ==> ", vm.Model.post.isAnnonymous);  //true이면 보이기, false면 익명
      console.log("vm.Model.post.title ==> ", vm.Model.post.title);
      console.log("vm.Model.post.content ==> ", vm.Model.post.content);
      console.log("vm.Model.post.photos ==> ", vm.Model.post.photos);
      //1. Validation Check 진행
      //   vm.Model.post를 body에 붙여서 서버로 query를 보냄
      reset();
      return RootScope.goBack('forward');
    }

  }
})();
