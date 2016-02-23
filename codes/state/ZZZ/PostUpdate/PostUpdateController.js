(function() {
  'use strict';
  angular.module('app')
    .controller('zPostUpdateController', zPostUpdateController);

  zPostUpdateController.$inject = [
    '$scope', '$state', '$q',
    'zPostUpdateModel', 'Util', 'Posts', 'Message'
  ];

  function zPostUpdateController(
    $scope, $state, $q,
    zPostUpdateModel, Util, Posts, Message
  ) {
    var initPromise;
    var noLoadingStates = [];
    var PostUpdate = this;
    PostUpdate.Model = zPostUpdateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PostUpdate.updatePost = updatePost;

    //====================================================
    // View Events
    //====================================================
    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(zPostUpdateModel);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(post) {
            Util.bindData(post, zPostUpdateModel, 'form');
            console.log("---------- post ----------");
            console.log(post);
          })
          .catch(function(err) {
            Util.error(err);
          });
      } else {}
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function updatePost() {
      Message.loading();
      return postUpdate()
        .then(function(updatedPost) {
          console.log("---------- updatedPost ----------");
          console.log(updatedPost);
          return Message.alert('글 수정 알림', '글수정을 완료하였습니다.');
        })
        .then(function() {
          Util.goToState('Main.zPostDetail', {
            id: $state.params.id
          }, 'back');
        })
        .catch(function(err) {
          Util.error(err);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return postFindOne();
    }

    function reset() {
      zPostUpdateModel.form = {
        title: '',
        content: ''
      };
    }


    //====================================================
    //  REST
    //====================================================
    function postFindOne(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          }
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.findOne(queryWrapper).$promise
        .then(function(post) {
          return post;
        });
    }

    function postUpdate() {
      var queryWrapper = {
        query: {
          id: $state.params.id,
          title: zPostUpdateModel.form.title,
          content: zPostUpdateModel.form.content,
        }
      };

      return Posts.update({}, queryWrapper).$promise
        .then(function(updatedPost) {
          return updatedPost;
        });
    }
  }
})();
