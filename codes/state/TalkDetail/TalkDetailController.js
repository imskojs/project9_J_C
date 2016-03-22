(function() {
  'use strict';
  angular.module('app')
    .controller('TalkDetailController', TalkDetailController);

  TalkDetailController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q', '$state', '$ionicModal', '$ionicScrollDelegate',
    'TalkDetailModel', 'Util', 'RootScope', 'Posts', 'Comments', 'Message', 'AppStorage'
  ];

  function TalkDetailController(
    _MockData,
    $ionicHistory, $scope, $q, $state, $ionicModal, $ionicScrollDelegate,
    TalkDetailModel, Util, RootScope, Posts, Comments, Message, AppStorage
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
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
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

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
        Util.loading(vm.Model);
        initPromise = init();
        //2개의 array Promise가 들어있는 Promise array 를 initPromise 변수에 대입
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then((array) => {
            console.log("array :::\n", array);
            let post = array[0]; //object
            let commentsWrapper = array[1]; //object
            vm.Model.post = post;
            return Util.bindData(commentsWrapper, vm.Model, 'comments');
          })
          .then(() => {
            console.log("vm.Model :::\n", vm.Model);
          })
          .catch((err) => {
            console.log("err :::\n", err);
          });

      } else {
        Util.freeze(false);
      }

      /*  bindData(data, model, name, emitPostTrue, loadingModel)
          "data를 이 model에 넣는다, name이라는 attribute를 만들고" 라고 해석해면 될듯.
          model[name] = data;
          model[name] = data[name];  3번째 인자의 끝이 s로 끝나는경우
          ==> Model.posts = PostWrapper
          ==> Model.posts = PostWrapper.posts  */
      // vm.Model.post = _MockData.findOne($state.params.postId);
      // console.log("vm.Model :::\n", vm.Model);
    }

    function onBeforeLeave(event, nextState) {
      if ($ionicHistory.currentStateName() !== nextState.name &&
        noResetStates.indexOf(nextState.name) === -1) {
        return reset();
      }
    }


    //====================================================
    //  VM
    //====================================================

    function openModal() {
      vm.ConfirmModal.show();
    }

    function closeModal() {
      vm.ConfirmModal.hide();
    }

    function isAnnonymousToggle() {
      if (vm.Model.comment.isAnnonymous) {
        vm.Model.comment.isAnnonymous = false;
      } else {
        vm.Model.comment.isAnnonymous = true;
      }
    }

    function toggleMore() {
      switch (vm.Model.toggleMore) {
        case true:
          vm.Model.toggleMore = false;
          return;
        case false:
          vm.Model.toggleMore = true;
          return;
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

    function init() {
      let postPromise = postFindOne({ id: $state.params.postId });
      let commentPromise = commentFind({ post: $state.params.postId });
      return $q.all([postPromise, commentPromise])
        .then((array) => {
          return array;
        });
    }

    function reset() {
      var Model = {
        loading: false,
        toggleMore: false,
        post: {},
        comments: [],
        comment: {
          isAnnonymous: false,
          content: ''
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
          populate: ['photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.findOne(queryWrapper).$promise
        .then((post) => {
          console.log("post :::\n", post);
          // find()    ==> 반드시 Array를 리턴
          // findOne() ==> 반드시 Object를 리턴
          return post;
        });
    }

    function commentFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
          // keywords: $state.params.keywords,
          sort: {},
          limit: 30
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Comments.find(queryWrapper).$promise
        .then((commentsWrapper) => {
          return commentsWrapper;
        });
    }

    //댓글 등록버튼 클릭
    function commentCreate() {
      // if (!AppStorage.token) {
      //   return Message.alert('알림', '댓글은 로그인 후에 작성할 수 있습니다.');
      // }
      if (vm.Model.comment.content.length < 2) {
        return Message.alert('알림', '내용을 입력하세요.');
      }
      vm.Model.loading = true;
      var queryWrapper = {
        query: {
          post: $state.params.postId,
          isAnnonymous: vm.Model.comment.isAnnonymous,
          content: vm.Model.comment.content,
          category: 'POST-COMMENT'
        }
      };
      $ionicScrollDelegate.scrollBottom();
      vm.Model.comment.isAnnonymous = false;
      vm.Model.comment.content = '';
      return Comments.createComment({}, queryWrapper).$promise
        .then(function(commentsWrapper) {
          console.log("commentsWrapper :::\n", commentsWrapper);
          // reset();
          return Util.bindData(commentsWrapper, vm.Model, 'comments');
        })
        .then(() => {
          vm.Model.loading = false;
        });
    }

    function talkDelete() {
      closeModal();
      return Posts.destroy({ id: $state.params.postId }).$promise
        .then(obj => {
          console.log("obj :::\n", obj);
          RootScope.goToState('Main.Footer.TalkList', {}, 'forward');
        });
      //1. 게시물id 를 서버로 쿼리전송
      //2. 서버에서는 해당 게시물의 댓글을 모두 삭제하는 작업
      //완료되면 goToState
    }

  }
})();