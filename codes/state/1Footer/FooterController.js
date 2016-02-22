(function() {
  'use strict';
  angular.module('app')
    .controller('FooterController', FooterController);

  FooterController.$inject = [
    '$rootScope', '$state',
    'FooterModel'
  ];

  function FooterController(
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
        //
      } else if ($state.includes('Main.Footer.EventTab.JoodangEventList')) {
        if (state === 'Main.Footer.Home') {
          return $rootScope.goToState(state, params, 'back');
        } else {
          return $rootScope.goToState(state, params, 'forward');
        }
        //Main.Footer.SearchTab.ProvinceList
      } else if ($state.includes('Main.Footer.SearchTab.ProvinceList')) {
        if (state === 'Main.Footer.Home' ||
          state === 'Main.Footer.EventTab.JoodangEventList'
        ) {
          return $rootScope.goToState(state, params, 'back');
        } else {
          return $rootScope.goToState(state, params, 'forward');
        }
      } else if ($state.includes('Main.Footer.TalkList')) {
        if (state === 'Main.Footer.Home' ||
          state === 'Main.Footer.EventTab.JoodangEventList' ||
          state === 'Main.Footer.SearchTab.ProvinceList'
        ) {
          return $rootScope.goToState(state, params, 'back');
        } else {
          return $rootScope.goToState(state, params, 'forward');
        }
      } else if ($state.includes('Main.Footer.SettingList')) {
        if (state === 'Main.Footer.Home' ||
          state === 'Main.Footer.EventTab.JoodangEventList' ||
          state === 'Main.Footer.SearchTab.ProvinceList' ||
          state === 'Main.Footer.TalkList'
        ) {
          return $rootScope.goToState(state, params, 'back');
        } else {
          return $rootScope.goToState(state, params, 'forward');
        }

      }
    }
  }
})();
