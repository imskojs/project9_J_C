// loading spinner and common message wrapper
(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Message', Message);

  Message.$inject = [
    '$ionicLoading', '$ionicPopup'
  ];

  function Message(
    $ionicLoading, $ionicPopup
  ) {
    var service = {
      loading: loading,
      hide: hide,
      success: success,
      error: error,
      alert: alert
    };

    return service;

    function loading(message) {
      $ionicLoading.show(message);
    }

    function success(message) {
      $ionicLoading.show({
        template: '<h4 class="message-success">' + message + '</h4>',
        duration: 2000
      });
    }

    function error(message) {
      $ionicLoading.show({
        template: '<h4 class="message-error">' + message + '</h4>',
        duration: 2000
      });
    }

    function hide() {
      $ionicLoading.hide();
    }

    function alert(title, message) {
      hide();
      return $ionicPopup.alert({
        title: title || '인터넷이 끊겼습니다.',
        template: message || '인터넷을 켜주세요.'
      });
    }


  }


})(angular);
