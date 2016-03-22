(function() {
  'use strict';
  angular.module('app')
    .controller('TalkListController', TalkListController);

  TalkListController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q', '$state',
    'TalkListModel', 'Util', 'Posts', 'RootScope', 'Message', 'AppStorage'
  ];

  function TalkListController(
    _MockData,
    $ionicHistory, $scope, $q, $state,
    TalkListModel, Util, Posts, RootScope, Message, AppStorage
  ) {
    var initPromise;
    var noLoadingStates = [
      'Main.Footer.MyTalkList',
      'Main.Footer.TalkDetail',
      'Main.Footer.TalkCreate',
      'Main.Footer.TalkUpdate',
    ];
    var noResetStates = [
      'Main.Footer.TalkDetail'
    ];
    var vm = this;
    vm.Model = TalkListModel;
    vm.categoryToggle = categoryToggle;
    vm.selectCategory = selectCategory;
    vm.filterCategory = filterCategory;
    vm.goToState = goToState;
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
      if (!Util.hasPreviousStates(noLoadingStates)) {
        initPromise
          .then((array) => {
            let noticePostsWrapper = array[0]; //공지
            let normalPostsWrapper = array[1]; //일반 주당톡
            console.log("noticePostsWrapper :::\n", noticePostsWrapper);
            console.log("normalPostsWrapper :::\n", normalPostsWrapper);
            vm.Model.notices = noticePostsWrapper.posts;
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


    function categoryToggle() {
      var status = vm.Model.categoryToggle; //true & false
      if (status) {
        vm.Model.categoryToggle = false;
      } else {
        vm.Model.categoryToggle = true;
      }
    }

    function selectCategory(category) {
      console.log("category :::\n", category);
      vm.Model.selectedCategory = category;
      vm.Model.infiniteScroll = true;
      var searchObj = { category: vm.Model.selectedCategory };
      if (vm.Model.selectedCategory === '전체') {
        searchObj = { showInTalk: true };
      }
      return postFind(searchObj)
        .then(function(postsWrapper) {
          Util.bindData(postsWrapper, vm.Model, 'posts');
        })
        .catch(function(err) {
          Util.error(err);
        })
        .finally(function() {
          Util.broadcast($scope);
        });
    }

    function filterCategory(selectedCategory) {
      switch (selectedCategory) {
        case '전체':
          return {};
        default:
          return { category: selectedCategory };
      }
    }

    function goToState(state, params, direction, messageTitle, messageContent) {
      // if (!AppStorage.token) {
      //   return Message.alert(messageTitle, messageContent);
      // }
      RootScope.goToState(state, params, direction);
    }

    function infiniteScroll() {
      var last = vm.Model.posts.length - 1;
      var searchObj = {
        category: vm.Model.selectedCategory,
        id: {
          '<': vm.Model.posts[last].id,
        },
      };
      if (vm.Model.selectedCategory === '전체') {
        searchObj = {
          showInTalk: true,
          id: {
            '<': vm.Model.posts[last].id,
          },
        };
      }
      return postFind(searchObj)
        .then(function(postsWrapper) {
          return Util.appendData(postsWrapper, vm.Model, 'posts');
        })
        .catch(function(err) {
          Util.error(err);
        });
    }

    //====================================================
    //  Private
    //====================================================

    function init() { //서버에서 data를 가져오는 작업을 진행함.
      let noticePostPromise = postFind({ category: 'TALK-NOTICE' }, { limit: 5 });
      let normalPostPromise = postFind({ showInTalk: true, category: { '!': 'TALK-NOTICE' } });
      return $q.all([noticePostPromise, normalPostPromise])
        .then(array => {
          return array;
        });
    }

    function reset() {
      var Model = {
        handle: 'talk-list',
        loading: false,
        infiniteScroll: true,
        categoryToggle: false,
        selectedCategory: '전체',
        notices: [],
        posts: []
      };
      angular.copy(Model, vm.Model);
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
          limit: 30,
          sort: 'id DESC',
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