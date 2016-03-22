(function() {
  'use strict';
  angular.module('app')
    .controller('JoodangEventListController', JoodangEventListController);

  JoodangEventListController.$inject = [
    '_MockData',
    '$ionicHistory', '$scope', '$q',
    'JoodangEventListModel', 'Util', 'Events', 'RootScope'
  ];

  function JoodangEventListController(
    _MockData,
    $ionicHistory, $scope, $q,
    JoodangEventListModel, Util, Events, RootScope
  ) {
    var initPromise;
    var noLoadingStates = [];
    var noResetStates = [];
    var vm = this;
    vm.Model = JoodangEventListModel;
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
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(JoodangEventListModel);
        initPromise = init();
        //2개의 array Promise가 들어있는 Promise array 를 initPromise 변수에 대입
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      initPromise
        .then((array) => { //initPromise 를 실행하고 나온 결과값인가?
          let joodangEventsWrapper = array[0];
          let barEventsWrapper = array[1];
          JoodangEventListModel.events = joodangEventsWrapper.events; //바인딩 되는것은 이거나 아래나 똑같지만,
          Util.bindData(joodangEventsWrapper, JoodangEventListModel, 'events'); //content 안에서 refresh 하는듯한 로직이 담겨있다.
          console.log("JoodangEventListModel :::\n", JoodangEventListModel);
        })
        /*  bindData(data, model, name, emitEventTrue, loadingModel)
            "data를 이 model에 넣는다, name이라는 attribute를 만들고" 라고 해석해면 될듯.
            model[name] = data;
            model[name] = data[name];  3번째 인자의 끝이 s로 끝나는경우
            ==> Model.events = EventWrapper
            ==> Model.events = EventWrapper.events  */
        // console.log("_MockData :::\n", _MockData);
        // Util.bindData(_MockData, JoodangEventListModel, 'events');
        // console.log("JoodangEventListModel :::\n", JoodangEventListModel);
      Util.freeze(false);
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

    function goToState(category, params, direction) {
      if (category === 'JOODANG-EVENT') {
        RootScope.goToState('Main.JoodangEventDetail', params, direction);
      } else if (category === 'BAR-EVENT') {
        RootScope.goToState('Main.BarEventDetail', params, direction);
      }
    }

    function infiniteScroll() {
      var last = vm.Model.events.length - 1;
      return eventFind({
          category: 'JOODANG-EVENT',
          id: {
            '<': vm.Model.events[last].id,
          },
        })
        .then(function(eventsWrapper) {
          if (!eventsWrapper.events.length) {
            return vm.Model.infiniteScroll = false;
          }
          Util.appendData(eventsWrapper, vm.Model, 'events');
        })
        .catch(function(err) {
          Util.error(err);
        })
        .finally(function() {
          Util.broadcast($scope);
        });
    }

    //====================================================
    //  Private
    //====================================================

    function init() { //서버에서 data를 가져오는 작업을 진행함.
      let joodangEventsPromise = eventFind({ category: 'JOODANG-EVENT' });
      let barEventsPromise = eventFind({ category: 'BAR-EVENT' });
      return $q.all([joodangEventsPromise, barEventsPromise])
        .then((array) => { //위의 3개의 array promise를 보내서
          return array; //하나의 array promise가 return됨. (무슨 작업을 하는지는 의문)
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

    function eventFind(extraQuery, extraOperation) {
      let queryWrapper = {
        query: {
          where: {},
          sort: 'id DESC',
          limit: 30,
          populate: [{
            property: 'photos',
            criteria: {
              sort: 'index ASC'
            }
          }]
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Events.find(queryWrapper).$promise
        .then((eventsWrapper) => {
          console.log("eventsWrapper :::\n", eventsWrapper);
          return eventsWrapper; //object안에 array가 존재
        });
    }
  }
})();