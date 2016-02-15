(function() {
  'use strict';
  angular.module('app')
    .controller('zPostListController', zPostListController);

  zPostListController.$inject = [
    '$scope', '$q',
    'zPostListModel', 'U', 'Posts'
  ];

  function zPostListController(
    $scope, $q,
    zPostListModel, U, Posts
  ) {
    var initPromise;
    var noLoadingStates = [
      'Main.zPostDetail'
    ];
    var PostList = this;
    PostList.Model = zPostListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    PostList.refresh = refresh;
    PostList.loadMore = loadMore;

    //====================================================
    // View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(zPostListModel);
        initPromise = init();
      } else {
        U.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(postsWrapper) {
            console.log("---------- postsWrapper ----------");
            console.log(postsWrapper);
            U.bindData(postsWrapper, zPostListModel, 'posts');
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {}
    }

    //====================================================
    //  Implementation
    //====================================================
    function refresh() {
      return init()
        .then(function(postsWrapper) {
          console.log("---------- postsWrapper ----------");
          console.log(postsWrapper);
          U.bindData(postsWrapper, zPostListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = zPostListModel.posts.length - 1;
      return find({
          id: {
            '<': zPostListModel.posts[last].id
          }
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, zPostListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return find();
    }

    //====================================================
    // REST
    //====================================================
    function find(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            category: 'CATEGORY_NAME-POST',
          },
          limit: 20,
          sort: 'updatedAt DESC',
          populate: ['owner']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.find(queryWrapper).$promise
        .then(function(postsWrapper) {
          return postsWrapper;
        });
    }
  }
})();
