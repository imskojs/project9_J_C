(function(angular) {
  'use strict';
  angular.module('app')
    .controller('zPostDetailController', zPostDetailController);

  zPostDetailController.$inject = [
    '$scope', '$state', '$q',
    'zPostDetailModel', 'Posts', 'Comments', 'Message', 'U'
  ];

  function zPostDetailController(
    $scope, $state, $q,
    zPostDetailModel, Posts, Comments, Message, U
  ) {
    var initPromise;
    var noLoadingStates = [];
    var PostDetail = this;
    PostDetail.Model = zPostDetailModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PostDetail.refresh = refresh;
    PostDetail.loadMoreComments = loadMoreComments;
    PostDetail.destroyPost = destroyPost;
    PostDetail.createComment = createComment;
    PostDetail.destroyComment = destroyComment;

    // App Specific
    PostDetail.showBubble = false;

    //====================================================
    // View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(zPostDetailModel);
        initPromise = init();
      } else {
        U.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(array) {
            var post = array[0];
            var commentsWrapper = array[1];
            U.bindData(post, zPostDetailModel, 'post');
            U.bindData(commentsWrapper, zPostDetailModel, 'comments');
            console.log("---------- post ----------");
            console.log(post);
            console.log("---------- commentsWrapper ----------");
            console.log(commentsWrapper);
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {}
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function refresh() {
      return init()
        .then(function(array) {
          var post = array[0];
          var commentsWrapper = array[1];
          U.bindData(post, zPostDetailModel, 'post');
          U.bindData(commentsWrapper, zPostDetailModel, 'comments');
          console.log("---------- post ----------");
          console.log(post);
          console.log("---------- commentsWrapper ----------");
          console.log(commentsWrapper);
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMoreComments() {
      var last = zPostDetailModel.comments.length - 1;
      return commentsFind({
          id: {
            '<': zPostDetailModel.comments[last].id
          }
        })
        .then(function(commentsWrapper) {
          U.appendData(commentsWrapper, zPostDetailModel, 'comments');
          console.log("---------- commentsWrapper ----------");
          console.log(commentsWrapper);
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function destroyPost() {
      Message.loading();
      return postsDestroy()
        .then(function(destroyedPost) {
          console.log("---------- destroyedPost ----------");
          console.log(destroyedPost);
          return Message.alert('글삭제 알림', '글을 성공적으로 삭제하였습니다.');
        })
        .then(function() {
          U.goToState('Main.zPostList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function createComment() {
      Message.loading();
      return commentsCreate()
        .then(function(createdComment) {
          console.log("---------- createdComment ----------");
          console.log(createdComment);
          refresh();
          return Message.alert('댓글달기 알림', '댓글을 성공적으로 작성하였습니다.');
        })
        .then(function() {
          reset();
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function destroyComment(commentId) {
      Message.loading();
      var extraQuery = {
        id: commentId
      };
      return commentsDestroy(extraQuery)
        .then(function(destroyedComment) {
          console.log("---------- destroyedComment ----------");
          console.log(destroyedComment);
          refresh();
          return Message.alert('댓글 알림', '댓글을 성공적으로 삭제하였습니다.');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return $q.all([postsFindOne(), commentsFind()]);
    }

    function reset() {
      U.resetSlides();
      PostDetail.showBubble = false;
      PostDetail.commentContent = '';
    }

    //====================================================
    // REST
    //====================================================
    function postsFindOne(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id,
          },
          populate: ['owner', 'photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.findOne(queryWrapper).$promise
        .then(function(post) {
          return post;
        });
    }

    function postsDestroy(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          }
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.destroy(queryWrapper).$promise
        .then(function(destroyedPost) {
          return destroyedPost;
        });
    }

    function commentsFind(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            post: $state.params.id,
          },
          sort: 'id DESC',
          limit: 20,
          populate: ['owner']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Comments.find(queryWrapper).$promise
        .then(function(commentsWrapper) {
          return commentsWrapper;
        });
    }


    function commentsCreate() {
      var queryWrapper = {
        query: {
          post: $state.params.id,
          content: PostDetail.form.commentContent
        }
      };
      return Comments.create({}, queryWrapper).$promise
        .then(function(createdComment) {
          return createdComment;
        });
    }

    function commentsDestroy(extraQuery) {
      var queryWrapper = {
        query: {
          where: {
            id: ''
          }
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Comments.destroy(queryWrapper).$promise
        .then(function(destroyedComment) {
          return destroyedComment;
        });
    }

  } //end
})(angular);
