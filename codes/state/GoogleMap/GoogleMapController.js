(function() {
  'use strict';
  angular.module('app')
    .controller('GoogleMapController', GoogleMapController);

  GoogleMapController.$inject = [
    '$rootScope', '$scope', '$state',
    'GoogleMapModel'
  ];

  function GoogleMapController(
    $rootScope, $scope, $state,
    GoogleMapModel
  ) {
    var vm = this;
    vm.Model = GoogleMapModel;

    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    // set by google-map directive
    vm.setCenterByAdress = null;
    vm.setCenterByCurrentPosition = null;

    //====================================================
    //  View Events
    //====================================================
    function onAfterEnter() {
      if ($state.params.placeId) {
        vm.Model.place = $state.params.place;
        console.log("vm.Model.place :::\n", vm.Model.place);
        $scope.$broadcast('relayout');
        $rootScope.$broadcast('$rootScope:bindDataComplete');
      }
    }

  } //END
})();
