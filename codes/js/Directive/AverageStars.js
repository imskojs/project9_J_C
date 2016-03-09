//====================================================
//  Usage
//====================================================
// <ion-content class="has-subheader bottom44px"
//   scroll="false"
// >
//   <div id="gm0"
//     google-map
//     icon="img/map_iconunselect.png"
//     active-icon="img/map_iconselect.png"
//     center-marker="true"
//     idle-event="true"
//     vm="GoogleMap"
//     places="GoogleMap.Model.products"
//   >

//   </div>
// </ion-content>
(function() {
  'use strict';

  angular.module('app')
    .directive('averageStars', averageStars);

  averageStars.$inject = [];

  function averageStars() {

    var directiveDefinitionObject = {
      scope: {
        rating: '=',
        vm: '='
      },
      template: `
        <div class="col-auto zero mr2p"
          ng-repeat="a in vm.getAverageRating(rating)">
          <i class="ion-android-star positive"></i>
        </div>
        <div class="col-auto zero mr2p"
          ng-repeat="a in vm.getAverageRating(4.99999999999999 - rating)"><!--5일경우 0.5 단위일시 반올림으로인한 오류가 발생함-->
          <i class="ion-android-star grey"></i>
        </div>
      `
    };

    return directiveDefinitionObject;


  } // google map directive ends
})();
