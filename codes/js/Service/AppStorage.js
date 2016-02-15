// local storage wrapper, name spaced.
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('AppStorage', AppStorage);

  AppStorage.$inject = [
    '$localStorage',
    'APP_NAME'
  ];

  function AppStorage(
    $localStorage,
    APP_NAME
  ) {

    setInitialState();

    return $localStorage[APP_NAME];

    //====================================================
    //  Implementations
    //====================================================
    function setInitialState() {
      if (!$localStorage[APP_NAME]) {
        $localStorage[APP_NAME] = {};
      }
      var storage = $localStorage[APP_NAME];
      if (storage.isFirstTime === undefined) {
        storage.isFirstTime = true;
      }
    }

    //====================================================
    //  Helper
    //====================================================
  }
})(angular);
