(function() {
  'use strict';
  angular.module('app')
    .controller('BarEventDetailController', BarEventDetailController);

  BarEventDetailController.$inject = [
    '_MockData',
    '$scope', '$q', '$state',
    'BarEventDetailModel', 'Util', 'Events'
  ];

  function BarEventDetailController(
    _MockData,
    $scope, $q, $state,
    BarEventDetailModel, Util, Events
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = BarEventDetailModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      console.log("$state.params :::\n", $state.params);
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(BarEventDetailModel);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
    }

    function onAfterEnter() {
      initPromise
        .then((event) => {  //initPromise 를 실행하고 나온 결과값인가?
          Util.bindData(event, BarEventDetailModel, 'event');  //content 안에서 refresh 하는듯한 로직이 담겨있다.
          console.log("vm.Model :::\n", vm.Model);
        })
          /*  bindData(data, model, name, emitEventTrue, loadingModel)
              "data를 이 model에 넣는다, name이라는 attribute를 만들고" 라고 해석해면 될듯.
              model[name] = data;
              model[name] = data[name];  3번째 인자의 끝이 s로 끝나는경우
              ==> Model.events = EventWrapper
              ==> Model.events = EventWrapper.events  */
      // console.log("_MockData :::\n", _MockData);
      // Util.bindData(_MockData, BarEventDetailModel, 'events');
      // console.log("BarEventDetailModel :::\n", BarEventDetailModel);
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
      return eventFind({ id: $state.params.eventId });
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
          sort: {},
          limit: 30,
          populate: ['photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Events.findOne(queryWrapper).$promise
        .then((event) => {
          console.log("event :::\n", event);
          return event;  //{id: 12321, name: 'eventName'}
        });
    }
  }
})();
