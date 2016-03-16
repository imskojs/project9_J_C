(function() {
  'use strict';
  angular.module('app')
    .controller('MyTalkListController', MyTalkListController);

  MyTalkListController.$inject = [
    '_MockData',
    '$scope', '$q', '$state',
    'MyTalkListModel', 'Util', 'Posts', 'Message', 'AppStorage'
  ];

  function MyTalkListController(
    _MockData,
    $scope, $q, $state,
    MyTalkListModel, Util, Posts, Message, AppStorage
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = MyTalkListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      // console.log("$state.params :::\n", $state.params);
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(MyTalkListModel);
        initPromise = init();
        //2개의 array Promise가 들어있는 Promise array 를 initPromise 변수에 대입
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      initPromise
        .then((post) => {
          // Util.bindData(post, MyTalkListModel, 'posts');
          // console.log("MyTalkListModel :::\n", MyTalkListModel);
        })
          /*  bindData(data, model, name, emitPostTrue, loadingModel)
              "data를 이 model에 넣는다, name이라는 attribute를 만들고" 라고 해석해면 될듯.
              model[name] = data;
              model[name] = data[name];  3번째 인자의 끝이 s로 끝나는경우
              ==> Model.posts = PostWrapper
              ==> Model.posts = PostWrapper.posts  */
      console.log("_MockData :::\n", _MockData);
      Util.bindData(_MockData, MyTalkListModel, 'posts');
      console.log("MyTalkListModel :::\n", MyTalkListModel);
      Util.freeze(false);
    }

    function onBeforeLeave() {
      return reset();
    }


    //====================================================
    //  VM
    //====================================================

    //====================================================
    //  Private
    //====================================================

    function init() {  //서버에서 data를 가져오는 작업을 진행함.
      return postFind( {'!': {category: 'NOTICE'}}, {limit: null} );
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
          where: {},
          sort: {},
          populate: ['photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.find(queryWrapper).$promise
        .then(post => {
          console.log("post :::\n", post);
          // Resource object안에 array가 존재
          // {id:101, name:'aaa'}
          return post;
        });
    }
  }
})();
