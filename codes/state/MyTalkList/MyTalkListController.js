(function() {
  'use strict';
  angular.module('app')
    .controller('MyTalkListController', MyTalkListController);

  MyTalkListController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q', '$state',
    'MyTalkListModel', 'Util', 'Posts', 'RootScope', 'Message', 'AppStorage'
  ];

  function MyTalkListController(
    _MockData,
    $ionicHistory, $scope, $q, $state,
    MyTalkListModel, Util, Posts, RootScope, Message, AppStorage
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = MyTalkListModel;
    vm.infiniteScroll = infiniteScroll;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //$scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$stateChangeStart', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      // console.log("$state.params :::\n", $state.params);
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(vm.Model);
        initPromise = init();
        //2개의 array Promise가 들어있는 Promise array 를 initPromise 변수에 대입
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      initPromise
        .then((array) => {
          // let noticePostsWrapper = array[0]; //공지
          // console.log("noticePostsWrapper :::\n", noticePostsWrapper);
          // vm.Model.notices = noticePostsWrapper.posts;
          console.log("array[1] :::\n", array[1]);
          let normalPostsWrapper = array[1]; //일반 주당톡
          return Util.bindData(normalPostsWrapper, vm.Model, 'posts');
        })
        .then(() => {
          console.log("vm.Model :::\n", vm.Model);
        })
        /*  bindData(data, model, name, emitPostTrue, loadingModel)
            "data를 이 model에 넣는다, name이라는 attribute를 만들고" 라고 해석해면 될듯.
            model[name] = data;
            model[name] = data[name];  3번째 인자의 끝이 s로 끝나는경우
            ==> Model.posts = PostWrapper
            ==> Model.posts = PostWrapper.posts  */
        // console.log("_MockData :::\n", _MockData);
        // vm.Model.notices.push(_MockData.post4);  //공지
        // Util.bindData(_MockData, vm.Model, 'posts');
        // console.log("vm.Model :::\n", vm.Model);
      Util.freeze(false);
    }

    function onBeforeLeave() {
      // vm.Model.notices.pop(); //id의 track by 오류가 발생함.
      return reset();
    }


    //====================================================
    //  VM
    //====================================================

    //====================================================
    //  Private
    //====================================================

    function init() { //서버에서 data를 가져오는 작업을 진행함.
      let noticePostPromise = postFind({ showInTalk: false }, { limit: 5 });
      let normalPostPromise = postFind({ showInTalk: true, owner: AppStorage.user.id });
      return $q.all([noticePostPromise, normalPostPromise])
        .then(array => {
          return array;
        });
    }

    function reset() {
      var Model = {
        loading: false,
        posts: []
      };
      angular.copy(Model, vm.Model);
    }

    function infiniteScroll() {
      var last = vm.Model.posts.length - 1;
      var searchObj = {
        owner: AppStorage.user.id,
        id: {
          '<': vm.Model.posts[last].id,
        },
      };
      return postFind(searchObj)
        .then(function(postsWrapper) {
          return Util.appendData(postsWrapper, vm.Model, 'posts');
        })
        .catch(function(err) {
          Util.error(err);
        });
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
          // sort: {},
          populate: ['photos', 'owner']
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
  }
})();