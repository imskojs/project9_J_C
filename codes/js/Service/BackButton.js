// Usage
// BackButton.register();
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('BackButton', BackButton);

  BackButton.$inject = [
    '$window', '$ionicPlatform', '$ionicHistory',
    'RootScope'
  ];

  function BackButton(
    $window, $ionicPlatform, $ionicHistory,
    RootScope
  ) {

    var service = {
      register: register
    };

    function register () {
      return $ionicPlatform.registerBackButtonAction(function(e) {  //backButton이 눌려졌을때 호출되는 콜백
        e.preventDefault();
        if (RootScope.areStates(['Main.Footer.Home'])) {  //홈화면에서 백버튼을 누르면
          return ionic.Platform.exitApp();  //앱종료
        }
        if (RootScope.areStates(['Main.PostList'])) {
        }
        $ionicHistory.goBack();
      }, 101);  //101을 사용하면 100보다 우선순위가 높아진다. 오버라이딩 가능.
      // Return to previous view = 100  이전 뷰로 돌아가기
      // Close side menu = 150          사이드메뉴를 닫기
      // Dismiss modal = 200            모달창 해제
      // Close action sheet = 300       액션시트를 닫기
      // Dismiss popup = 400            팝업 해제
      // Dismiss loading overlay = 500  로딩 오버레이를 해제
    }

    return service;
  };
})(angular);