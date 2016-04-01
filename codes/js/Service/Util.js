// Utility
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Util', Util);

  Util.$inject = [
    '$ionicHistory', '$ionicScrollDelegate', '$timeout', '$filter', '$window', '$rootScope',
    '$ionicSideMenuDelegate', '$state', '$ionicViewSwitcher', '$ionicSlideBoxDelegate', '$q',
    '$location',
    'Message', 'RootScope', 'Dom'
  ];

  function Util(
    $ionicHistory, $ionicScrollDelegate, $timeout, $filter, $window, $rootScope,
    $ionicSideMenuDelegate, $state, $ionicViewSwitcher, $ionicSlideBoxDelegate, $q,
    $location,
    Message, RootScope, Dom
  ) {

    var _ = $window._;
    var service = {
      isForwardView: isForwardView,
      isBackView: isBackView,
      isSiblingView: isSiblingView,
      areSiblingViews: areSiblingViews,
      hasPreviousStates: hasPreviousStates,
      resize: resize,
      update: update,
      resetSlides: resetSlides,
      error: error,
      bindData: bindData,
      appendData: appendData,
      broadcast: broadcast,
      top: top,
      scrollBottom: scrollBottom,
      scrollTop: scrollTop,
      scrollTo: scrollTo,
      scrollToId: scrollToId,
      freeze: freeze,
      loading: loading,
    };

    _.defaults(service, RootScope); //extends

    return service;

    // Within Parent State Stack
    function isForwardView(stateName) {
      if ($ionicHistory.viewHistory().forwardView) {
        return $ionicHistory.viewHistory().forwardView.stateName === stateName;
      } else {
        return false;
      }
    }

    // Within Parent State Stack
    function isBackView(stateName) {
      if ($ionicHistory.viewHistory().backView) {
        return $ionicHistory.viewHistory().backView.stateName === stateName;
      } else {
        return false;
      }
    }

    // Within Parent State Stack
    function isSiblingView(stateName) {
      return isForwardView(stateName) || isBackView(stateName);
    }

    // Within Parent State Stack
    function areSiblingViews(stateNames) {
      var i;
      var stateName;
      for (i = 0; i < stateNames.length; i++) {
        stateName = stateNames[i];
        if (isSiblingView(stateName)) {
          return true;
        }
      }
      return false;
    }

    // Absolute previous State. Within or Without parent stack.
    function hasPreviousStates(stateNames) {
      if (stateNames.length === 0) {
        return false;
      }
      var currentViewId = $ionicHistory.currentView().viewId.split('ion').pop();
      var prevViewId = Number(currentViewId) - 1;
      var prevViewKey = 'ion' + prevViewId;
      var prevStateName = $ionicHistory.viewHistory().views[prevViewKey] &&
        $ionicHistory.viewHistory().views[prevViewKey].stateName;
      var hasPrevView = _.indexOf(stateNames, prevStateName) !== -1;
      var hasSiblingView = areSiblingViews(stateNames);
      if (hasPrevView) {
        return true;
      } else if (hasSiblingView) {
        return true;
      }
      return false;
    }

    // update content scroll
    function resize() {
      $timeout(function() {
        $ionicScrollDelegate.resize();
      }, 0);
    }

    // update slidebox
    function update() {
      $timeout(function() {
        $ionicSlideBoxDelegate.update();
      }, 0);
    }

    // fix bug where prev slide number persist
    function resetSlides() {
      $ionicSlideBoxDelegate.slide(0, 0);
      $ionicSlideBoxDelegate.update();
    }

    function error(err) {
      console.log(err);
      $rootScope.$broadcast('scroll.refreshComplete');
      $rootScope.$broadcast('scroll.infiniteScrollComplete');
      if (err.data && err.data.invalidAttributes && err.data.invalidAttributes.username) {
        return Message.alert('회원가입 알림', '이미 존재하는 이메일입니다. 다른 이메일을 입력해주세요.')
          .then(function() {
            Dom.focusById('email');
          });
      } else if (err.data && err.data.invalidAttributes && err.data.invalidAttributes.email) {
        return Message.alert('회원가입 알림', '이미 존재하는 이메일입니다. 다른 이메일을 입력해주세요.')
          .then(function() {
            Dom.focusById('email');
          });
      } else if (err === 'Problem authenticating') {
        Message.alert('로그인 알림', '로그인이 잘못 되었습니다. 다시 시도해주세요.');
      } else if (err === 'Facebook returned error_code=100: Invalid permissions') {
        Message.alert('로그인 알림', '로그인이 잘못 되었습니다. 다시 시도해주세요.');
      } else if (err === 'The sign in flow was canceled') {
        Message.alert('로그인 알림', '로그인을 취소 하셨습니다.');
      } else {
        return Message.alert();
      }
    }

    function bindData(data, model, name, emitEventTrue, loadingModel) {
      let deferred = $q.defer();
      $timeout(function() {
        // if data is a dataArrayWrapper
        if (name[name.length - 1] === 's') {
          model[name] = data[name];
          model.more = data.more !== undefined ? data.more : model.more; //infinite scroll에서 사용
          model.total = data.total !== undefined ? data.total : model.total; //admin
        } else {
          // if data is a dataObject
          model[name] = data; //model에 property를 넣어줌.
        }
        if (!loadingModel) {
          model.loading = false;
        } else {
          loadingModel.loading = false; //부분적 로딩으로 사용
        }
        update();
        resize();
        $rootScope.$broadcast('scroll.refreshComplete');
        $rootScope.$broadcast('scroll.infiniteScrollComplete');
        if (emitEventTrue) {
          $rootScope.$broadcast('$rootScope:bindDataComplete');
        }
        deferred.resolve();
      }, 0);
      return deferred.promise;
    }

    function appendData(dataWrapper, model, name, emitEventTrue) {
      let deferred = $q.defer();
      $timeout(function() {
        if (name[name.length - 1] === 's') {
          angular.forEach(dataWrapper[name], function(item) {
            model[name].push(item);
          });
          model.more = dataWrapper.more;
          resize();
          $rootScope.$broadcast('scroll.refreshComplete');
          $rootScope.$broadcast('scroll.infiniteScrollComplete');
          if (emitEventTrue) {
            $rootScope.$broadcast('$rootScope:appendDataComplete');
          }
        } else {
          // if data is a data
          console.error('no dataArrayWrapper.dataArray perhaps dataWrapper is dataObject.');
        }
        deferred.resolve();
      }, 0);
      return deferred.promise;
    }

    function broadcast($scope) {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    function top() {
      $ionicScrollDelegate.scrollTop(false);
    }

    function scrollBottom(animationTrue) {
      $ionicScrollDelegate.scrollBottom(animationTrue);
    }

    function scrollTop(animationTrue) {
      $ionicScrollDelegate.scrollTop(animationTrue);
    }

    function scrollTo(Model) {
      if (Model) {
        if (Model.scrollPosition === undefined) {
          console.log('no CtrlAs.Model.scollPosition -- Util.scrollTo');
        }
        if (Model.handle) {
          $ionicScrollDelegate.$getByHandle(Model.handle).scrollTo(undefined, Model.scrollPosition, false);
        } else {
          console.log('no CtrlAs.Model.handle -- Util.scrollTo');
        }
      } else {
        console.log('no CtrlAs.Model -- Util.scrollTo');
      }
    }

    function scrollToId(elementId, animationTrue) {
      $location.hash(elementId);
      $ionicScrollDelegate.anchorScroll(animationTrue);
    }

    function freeze(shouldFreezeTrue) {
      $ionicScrollDelegate.freezeAllScrolls(shouldFreezeTrue);
      // if (shouldFreezeTrue) {
      //   $ionicScrollDelegate.getScrollView().options.scrollingY = false;
      // } else {
      //   $ionicScrollDelegate.getScrollView().options.scrollingY = true;
      // }
      // $ionicScrollDelegate.freezeScroll(shouldFreezeTrue);
    }

    function loading(Model) {
      Model.loading = true;
      // freeze(true);
      $timeout(function() {
        if (Model.handle) {
          $ionicScrollDelegate.$getByHandle(Model.handle).scrollTop(false);
        } else {
          top();
        }
      }, 0);
    }


  } // Service END
})(angular);
