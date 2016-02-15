// Used to call external resource such as external browser, calling phone, and social sharing;
// Dependencies
//Cordova InAppBrowser
//Cordova SocialSharing
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Link', Link);

  Link.$inject = [
    '$window', '$cordovaSocialSharing', '$state',
    'AppStorage', 'Message'
  ];

  function Link(
    $window, $cordovaSocialSharing, $state,
    AppStorage, Message
  ) {

    var service = {
      call: call,
      open: open,
      share: share
    };
    return service;

    //====================================================
    //  Link.call Usage
    //====================================================
    //Link.call(01011010101)
    // Output
    //phone call
    function call(phone) {
      if (!phone) {
        Message.alert('전화하기 알림', '전화가 없습니다.');
        return false;
      }
      phone = String(phone);
      if (phone[0] !== '0') {
        phone = '0' + phone;
      }
      var phoneArray = phone.split('');
      var indexParen = phoneArray.indexOf(')');
      if (indexParen !== -1) {
        phoneArray.splice(indexParen, 1);
      }
      var indexDash = phoneArray.indexOf('-');
      if (indexDash !== -1) {
        phoneArray.splice(indexDash, 1);
      }
      indexDash = phoneArray.indexOf('-');
      if (indexDash !== -1) {
        phoneArray.splice(indexDash, 1);
      }
      indexDash = phoneArray.indexOf('-');
      if (indexDash !== -1) {
        phoneArray.splice(indexDash, 1);
      }
      phone = phoneArray.join('');
      $window.location.href = 'tel:' + phone;
    }

    //====================================================
    //  Link.openLink Usage
    //====================================================
    //Link.openLink('http://www.applicat.co.kr');
    // Output
    //InAppBrowser open new window with url
    function open(link) {
      return $window.open(link, '_system');
    }

    //====================================================
    //  Link.share Usage
    //====================================================
    // Link.share('my title', 'my content stuff', 'http://www.applicat.co.kr')
    // Output
    //Social Share title content and link
    function share(title, content, url) {
      return $cordovaSocialSharing
        .share(title, content, null, url)
        .then(function(suc) {
          console.log(suc);
        }, function(err) {
          console.log(err);
        });
    }
  }
})(angular);
