(function() {
  'use strict';
  angular.module('app')
    .controller('TalkDetailController', TalkDetailController);

  TalkDetailController.$inject = [
    '_MockData',
    '$scope', '$q', '$state', '$ionicModal',
    'TalkDetailModel', 'Util', 'RootScope', 'Posts', 'Comments', 'Message', 'AppStorage'
  ];

  function TalkDetailController(
    _MockData,
    $scope, $q, $state, $ionicModal,
    TalkDetailModel, Util, RootScope, Posts, Comments, Message, AppStorage
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = TalkDetailModel;
    vm.isAnnonymousToggle = isAnnonymousToggle;
    vm.toggleMore = toggleMore;
    vm.openModal = openModal;
    vm.closeModal = closeModal;
    vm.goToState = goToState;
    vm.talkDelete = talkDelete;
    vm.commentCreate = commentCreate;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    $ionicModal.fromTemplateUrl('state/TalkDetail/Modal/ConfirmModal.html', {
      scope: $scope,
      animation: 'mh-slide'
    }).then(function(modal) {
      vm.ConfirmModal = modal;

    });

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      console.log("$state.params :::\n", $state.params);
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(TalkDetailModel);
        initPromise = init();
        //2개의 array Promise가 들어있는 Promise array 를 initPromise 변수에 대입
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      initPromise
        .then((array) => {
          let noticePostsWrapper = array[0];  //공지
          let normalPostsWrapper = array[1];  //일반 주당톡
          // TalkDetailModel.posts = noticePostWrapper.posts;  //바인딩 되는것은 이거나 아래나 똑같지만,
          // Util.bindData(postsWrapper, TalkDetailModel, 'posts');  //content 안에서 refresh 하는듯한 로직이 담겨있다.
          // console.log("TalkDetailModel :::\n", TalkDetailModel);
        })
          /*  bindData(data, model, name, emitPostTrue, loadingModel)
              "data를 이 model에 넣는다, name이라는 attribute를 만들고" 라고 해석해면 될듯.
              model[name] = data;
              model[name] = data[name];  3번째 인자의 끝이 s로 끝나는경우
              ==> Model.posts = PostWrapper
              ==> Model.posts = PostWrapper.posts  */
      TalkDetailModel.post = _MockData.findOne($state.params.postId);
      console.log("TalkDetailModel :::\n", TalkDetailModel);
      Util.freeze(false);
    }

    function onBeforeLeave() {
      return reset();
    }


    //====================================================
    //  VM
    //====================================================

    function openModal() {
      vm.ConfirmModal.show();
    };

    function closeModal() {
      vm.ConfirmModal.hide();
    };

    function isAnnonymousToggle() {
      if (vm.Model.isAnnonymous) {
        vm.Model.isAnnonymous = false;
      } else {
        vm.Model.isAnnonymous = true;
      }
    }

    function toggleMore() {
      switch (vm.Model.toggleMore) {
        case true : vm.Model.toggleMore = false; return;
        case false: vm.Model.toggleMore = true; return;
      }
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
      let noticePostPromise = postFind( {category: 'NOTICE'}, {limit: 5} );
      let normalPostPromise = postFind( {'!': {category: 'NOTICE'}}, {limit: null} );
      return $q.all([noticePostPromise, normalPostPromise])
        .then(array => {
          return array;
        });

      let commentPromise = commentFind({ category: 'PREMIUM' });
      return $q.all([commentPromise])
        .then((array) => {
          return array;
        })
    }

    function reset() {
      vm.Model.isAnnonymous = false;
      vm.Model.toggleMore = false;
      vm.Model.comment.content = '';
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
        .then((postsWrapper) => {
          console.log("postsWrapper :::\n", postsWrapper);
          // Resource object안에 array가 존재
          // {events: [{id:101, name:'aaa'}, {id: 102, name:'bbb'} ...]}
          return postsWrapper;
        });
    }

    function commentFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
          keywords: $state.params.keywords,
          sort: {},
          limit: 30
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Places.find(queryWrapper).$promise
        .then((commentList) => {
          return commentList;
        });
    }

    //댓글 등록버튼 클릭
    function commentCreate() {
      // if (!AppStorage.token) {
      //   return Message.alert('알림', '댓글은 로그인 후에 작성할 수 있습니다.');
      // }
      console.log("vm.Model.comment.content :::\n", vm.Model.comment.content);
      console.log("vm.Model.isAnnonymous :::\n", vm.Model.isAnnonymous);
      console.log("vm.Model.post.id :::\n", vm.Model.post.id);
      //1. Validation Check 진행
      //2. vm.Model.isAnnonymous
      //   vm.Model.comment.content
      //   vm.Model.현재시간
      //   vm.Model.게시물id
      //   session.유저id 를 가지고 서버로 쿼리전송
      //3. DB insert성공시 해당 댓글을 vm.Model.commentList 에 바인딩
      reset();
      $state.reload();
    }

    function talkDelete() {
      console.log("$state.params.postId :::\n", $state.params.postId);
      //1. 게시물id 를 서버로 쿼리전송
      //2. 서버에서는 해당 게시물의 댓글을 모두 삭제하는 작업
      //완료되면 goToState
      closeModal();
      RootScope.goToState('Main.Footer.TalkList', {}, 'forward');
    }

  }
})();
