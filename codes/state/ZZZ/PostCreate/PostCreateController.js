(function() {
  'use strict';
  angular.module('app')
    .controller('zPostCreateController', zPostCreateController);

  zPostCreateController.$inject = [
    '$scope', '$q',
    'zPostCreateModel', 'Posts', 'Util', 'Message'
  ];

  function zPostCreateController(
    $scope, $q,
    zPostCreateModel, Posts, Util, Message
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var PostCreate = this;
    PostCreate.Model = zPostCreateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    PostCreate.createPost = createPost;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(zPostCreateModel);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(message) {
            Util.freeze(false);
            console.log("---------- message ----------");
            console.log(message);
          })
          .catch(function(err) {
            Util.error(err);
          });
      } else {}
    }

    function onBeforeLeave(event, nextState) {
      if ($ionicHistory.currentStateName() !== nextState.name &&
        noResetStates.indexOf(nextState.name) === -1
      ) {
        return reset();
      }
    }

    //====================================================
    //  Implementation
    //====================================================
    function createPost() {
      Message.loading();
      return postCreate()
        .then(function(createdPost) {
          console.log("---------- createdPost ----------");
          console.log(createdPost);
          return Message.alert('글작성 알림', '글을 성공적으로 작성하였습니다.');
        })
        .then(function() {
          Util.goToState('Main.zPostList', null, 'back');
        })
        .catch(function(err) {
          Util.error(err);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return $q.resolve({
        message: 'empty'
      });
    }

    function reset() {
      zPostCreateModel.form.title = '';
      zPostCreateModel.form.content = '';
    }

    //====================================================
    //  REST
    //====================================================
    function postCreate() {
      var queryWrapper = {
        query: {
          category: 'CATEGORY_NAME-POST',
          title: zPostCreateModel.form.title,
          content: zPostCreateModel.form.content,
        }
      };
      return Posts.create({}, queryWrapper).$promise
        .then(function(dataWrapper) {
          var post = dataWrapper.data;
          return post;
        });
    }
  }
})();