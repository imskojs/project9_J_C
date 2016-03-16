(function() {
  'use strict';
  angular.module('app')
    .controller('TalkListController', TalkListController);

  TalkListController.$inject = [
    '_MockData',
    '$scope', '$q', '$state',
    'TalkListModel', 'Util', 'Posts', 'RootScope', 'Message', 'AppStorage'
  ];

  function TalkListController(
    _MockData,
    $scope, $q, $state,
    TalkListModel, Util, Posts, RootScope, Message, AppStorage
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = TalkListModel;
    vm.categoryToggle = categoryToggle;
    vm.selectCategory = selectCategory;
    vm.filterCategory = filterCategory;
    vm.goToState = goToState;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

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
          let noticePostsWrapper = array[0];  //공지
          let normalPostsWrapper = array[1];  //일반 주당톡
          vm.Model.posts = noticePostsWrapper.posts;  //바인딩 되는것은 이거나 아래나 똑같지만,
          Util.bindData(normalPostsWrapper, vm.Model, 'posts');  //content 안에서 refresh 하는듯한 로직이 담겨있다.
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
      vm.Model.notices.pop();  //id의 track by 오류가 발생함.
      return reset();
    }


    //====================================================
    //  VM
    //====================================================


    function categoryToggle() {
      var status = vm.Model.categoryToggle;  //true & false
      if (status) {
        vm.Model.categoryToggle = false;
      } else {
        vm.Model.categoryToggle = true;
      }
    }

    function selectCategory(category) {
      console.log("category :::\n", category);
      vm.Model.selectedCategory = category;
    }

    function filterCategory(selectedCategory) {
      switch (selectedCategory) {
        case '전체': return false;
        default: return {category: selectedCategory};
      }
    }

    function goToState(state, params, direction, messageTitle, messageContent) {
      // if (!AppStorage.token) {
      //   return Message.alert(messageTitle, messageContent);
      // }
      RootScope.goToState(state, params, direction);
    }

    //====================================================
    //  Private
    //====================================================

    function init() {  //서버에서 data를 가져오는 작업을 진행함.
      let noticePostPromise = postFind( {showInTalk: false}, {limit: 5} );
      let normalPostPromise = postFind( {showInTalk: true} );
      return $q.all([noticePostPromise, normalPostPromise])
        .then(array => {
          return array;
        });
    }

    function reset() {
      // vm.Model.review.rating = 0;
      // vm.Model.review.content = '';
      // vm.Model.review.photos = [];
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
          where: {
          },
          // sort: {},
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
  }
})();
