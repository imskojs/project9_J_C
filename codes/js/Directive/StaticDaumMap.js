//====================================================
//  Usage
//====================================================
// <div class="h300px w100p"
//   static-daum-map
//   marker-src="img/map_04.png"
//   marker-width="40"
//   marker-height="22"
//   longitude="{{PlaceDetail.Model.place.geoJSON.coordinates[0]}}"
//   latitude="{{PlaceDetail.Model.place.geoJSON.coordinates[1]}}"
// >
// </div>
//====================================================
//  Dependencies
//====================================================
// daum map api in www/index.html;
// <script src="http://apis.daum.net/maps/maps3.js?apikey=1d77329135df78c95c219758f5fdddfb&libraries=services"></script>


(function(angular) {
  'use strict';

  angular.module('app')
    .directive('staticDaumMap', staticDaumMap);

  staticDaumMap.$inject = ['$timeout', '$window'];

  function staticDaumMap($timeout, $window) {
    var daum = $window.daum;
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      var DOM = element[0];
      // static daum map does not allow marker image to be set.
      // disabled class is added to normal daumMap to disable all touch events
      element.addClass('disabled' /*30_touched.scss*/ );
      scope.$on('$rootScope:bindDataComplete', function() {
        var markerSize = new daum.maps.Size(Number(attrs.markerWidth), Number(attrs.markerHeight));
        var markerImg = new daum.maps.MarkerImage(attrs.markerSrc, markerSize);
        var placePosition = new daum.maps.LatLng(Number(attrs.latitude), Number(attrs.longitude));
        var marker = new daum.maps.Marker({
          position: placePosition,
          image: markerImg
        });
        var staticMapOption = {
          center: placePosition,
          level: 4
        };
        $timeout(function() {
          var map = new daum.maps.Map(DOM, staticMapOption);
          marker.setMap(map);
        }, 0);
      });
    }
  }

})(angular);
