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
    ];
    // var noResetStates = [
    //   'Main.Footer.MyTalkList',
    //   'Main.Footer.TalkDetail'
    // ];
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
        noLoadingStates.indexOf(nextState.name) === -1
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
          populate: [{
            property: 'photos',
            criteria: {
              sort: 'index ASC'
            }
          }, 'owner']
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

/*
{
  "isFirstTime": false,
  "deviceId": "eqrEWmM6AMo:APA91bExFVVhWCzHIe_2MH-CYY2znMwwFghlYMFNR9N9akqj-kjAgIxnaT2bMEGwVhkG-TOZAmHVsX4YsOvpY5qUTrT1lhY3jTmL3caDHPdhX3MrMjEBLUbGpqbnMkgj4pxoVi63k9hz",
  "currentPosition": { "longitude": 127.0412811, "latitude": 37.5001549 },
  "currentAddress": "서울특별시 강남구 역삼2동",
  "user": {
    "roles": [
      {
        "name": "USER",
        "active": true,
        "createdAt": "2016-03-22T08:06:46.723Z",
        "updatedAt": "2016-03-22T08:06:46.723Z",
        "id": "56f0fd165f9374c7fc0371bd"
      }],
    "favorites": ["56f0fe8d5f9374c7fc037277"],
    "profilePhoto": {
      "public_id": "ddmvy23cmh61cbue5eeq",
      "version": 1458707725,
      "signature": "e2051999ffd185917c28bc047aef98a52470b6b2",
      "width": 600,
      "height": 600,
      "format": "png",
      "resource_type": "image",
      "created_at": "2016-03-23T04:35:25Z",
      "tags": ["JOODANG"],
      "bytes": 494523,
      "type": "upload",
      "etag": "35dfaebddf06d7c46123e38fdf4b6010",
      "url": "http://res.cloudinary.com/appdev/image/upload/v1458707725/ddmvy23cmh61cbue5eeq.png",
      "secure_url": "https://res.cloudinary.com/appdev/image/upload/v1458707725/ddmvy23cmh61cbue5eeq.png",
      "original_filename": "338f7f14-343d-4897-801e-670c47f12437",
      "createdBy": "56f10b17eb57050e3d41bc06",
      "updatedBy": "56f10b17eb57050e3d41bc06",
      "owner": "56f10b17eb57050e3d41bc06",
      "index": 0,
      "createdAt": "2016-03-23T04:34:03.973Z",
      "updatedAt": "2016-03-23T04:34:03.973Z",
      "id": "56f21cbb6b87f09246bf2f0f"
    },
    "owner": "56f10b17eb57050e3d41bc06",
    "username": "94322116",
    "nickname": "Rex",
    "thumbnail_image": "http://mud-kage.kakao.co.kr/14/dn/btqcMcBxfpK/kzSPZslsuzMGjQ1qSIGvok/o.jpg",
    "profile_image": "http://mud-kage.kakao.co.kr/14/dn/btqcL9EPhUa/OymItKoYOCDD9dW1sQ0XJk/o.jpg",
    "createdAt": "2016-03-22T09:06:31.326Z",
    "updatedAt": "2016-03-23T05:46:23.177Z",
    "id": "56f10b17eb57050e3d41bc06",
    "gravatarUrl": "https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"
  },
  "token": "2Ir-nEW2--Dw1W2i1dDQobksKxRBTUz3a-03RawQQI0AAAFTogOzHA"
}
*/