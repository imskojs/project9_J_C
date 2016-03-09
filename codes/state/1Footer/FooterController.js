(function() {
  'use strict';
  angular.module('app')
    .controller('FooterController', FooterController);

  FooterController.$inject = [
    '_MockData',
    '$rootScope', '$state',
    'FooterModel'
  ];

  function FooterController(
    _MockData,
    $rootScope, $state,
    FooterModel
  ) {
    var Footer = this;
    Footer.Model = FooterModel;

    Footer.goToState = goToState;
    //====================================================
    //  Implementation
    //====================================================
    function goToState(state, params) {
      // Home
      if ($state.includes('Main.Footer.Home')) {
        return $rootScope.goToState(state, params, 'forward');


        //EventTab 과 하위 state까지 포함 (JoodangEventList 등)
      } else if ($state.includes('Main.Footer.EventTab')) {
        if (state === 'Main.Footer.Home') {
          return $rootScope.goToState(state, params, 'back');
        } else {
          return $rootScope.goToState(state, params, 'forward');
        }


        //SearchTab 과 하위 state까지 포함 (ProvinceSearchList 등)
      } else if ($state.includes('Main.Footer.SearchTab')) {
        if (state === 'Main.Footer.Home' ||
            state === 'Main.Footer.EventTab.JoodangEventList'
        ) {
          return $rootScope.goToState(state, params, 'back');
        } else {
          return $rootScope.goToState(state, params, 'forward');
        }


        //TalkList
      } else if ($state.includes('Main.Footer.TalkList') ||
                 $state.includes('Main.Footer.MyTalkList') ||
                 $state.includes('Main.Footer.TalkDetail') ||
                 $state.includes('Main.Footer.TalkCreate') ||
                 $state.includes('Main.Footer.TalkUpdate') ) {
        if (state === 'Main.Footer.Home' ||
            state === 'Main.Footer.EventTab.JoodangEventList' ||
            state === 'Main.Footer.SearchTab.ProvinceList') {
          return $rootScope.goToState(state, params, 'back');
        } else {
          return $rootScope.goToState(state, params, 'forward');
        }


        //SettingList
      } else if ($state.includes('Main.Footer.SettingList') ||
                 $state.includes('Main.Footer.Profile') ) {
        if (state === 'Main.Footer.Home' ||
            state === 'Main.Footer.EventTab.JoodangEventList' ||
            state === 'Main.Footer.SearchTab.ProvinceList' ||
            state === 'Main.Footer.TalkList') {
          return $rootScope.goToState(state, params, 'back');
        } else {
          return $rootScope.goToState(state, params, 'forward');
        }

      }
    }
  }
})();
