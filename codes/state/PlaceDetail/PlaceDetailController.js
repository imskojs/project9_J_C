(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceDetailController', PlaceDetailController);

  PlaceDetailController.$inject = [
    '_MockData',
    '$scope', '$state',
    'PlaceDetailModel', 'Util', 'Places', 'Reviews', 'Comments'
  ];

  function PlaceDetailController(
    _MockData,
    $scope, $state,
    PlaceDetailModel, Util, Places, Reviews, Comments
  ) {
    var initPromise;
    var noLoadingStates = [];
    var vm = this;
    vm.Model = PlaceDetailModel;
    vm.getAverageRating = getAverageRating;
    vm.moreReview = moreReview;
    vm.reviewDelete = reviewDelete;
    vm.commentDelete = commentDelete;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    //====================================================
    //  View Event
    //====================================================

    function onBeforeEnter() {
      if (!Util.hasPreviousStates(noLoadingStates)) {
        Util.loading(vm.Model);
        initPromise = init();
      } else {
        Util.freeze(false);
      }
      console.log("$state.params :::\n", $state.params);
    }

    function onAfterEnter() {
      initPromise
        .then(place => {    //{id: 1300, name: 'asda' ... }
          Util.bindData(place, vm.Model, 'place');  //Model['place'] = place
        })
        .then(() => {
          return restAPI(
            { place: $state.params.placeId },
            {
              populate: ['photos', 'comments', 'owner'],
              limit: 5
            },
            Reviews,
            'find'
          );
        })
        .then((reviewsWrapper) => {
          Util.bindData(reviewsWrapper, vm.Model, 'reviews');
        })
        .then(() => {
          console.log("vm.Model :::\n", vm.Model);
        })
        .catch((err) => {
          return console.log("err :::\n", err);
        });
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  VM
    //====================================================

    function getAverageRating (num) {
      var roundNum = Math.round(num);
      var array = [];
      for (var i=0; i<roundNum; i++) {
        array.push(i);
      }
      return array;
    }

    //리뷰 더보기 버튼 클릭
    function moreReview () {

    }

    //====================================================
    //  Private
    //====================================================

    function init() {
      // let placePromise = find({id: $state.params.placeId}, null, Places, 'findOne');
      //$state.params.placeId 를 통해 Place를 findOne()
      return restAPI(
          { id: $state.params.placeId },
          null,
          Places,
          'findOne'
        )
        .then(obj => {
          return obj;
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

    function restAPI(extraQuery, extraOperation, Obj, method) {
      let queryWrapper = {
        query: {
          where: {},
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Obj[method](queryWrapper).$promise
        .then(obj => {    //{id: 1300, name: 'asda' ... }
          console.log('쿼리 성공! ==> ', obj);
          return obj;
        });
    }

    // 유저 리뷰삭제 버튼 클릭
    function reviewDelete () {
      // implementation
    }

    // 사장님 댓글삭제 버튼 클릭
    function commentDelete (id) {
      let queryWrapper = {
        query: {
          where: {id: id}
        }
      };
      return Comment.destroyComment(queryWrapper).$promise
        .then(obj => {
          console.log("obj :::\n", obj);
          reload();
        })
    }
  }
})();
