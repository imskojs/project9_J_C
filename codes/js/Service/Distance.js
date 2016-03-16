// Usage
// Distance.between({latitude: 33, longitude: 33}, {latitude: 44, longitude:44});

// Output: distance between two points in meters.
// 20000
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Distance', Distance);

  Distance.$inject = ['$window'];

  function Distance($window) {

    var service = {
      between: $window.geolib.getDistance,
      createDistanceProperty: createDistanceProperty
    };

    return service;

    //(
    //  places: Array<Place>,
    //  currentPosition: {
    //    latitude: Integer,
    //    longitude: Integer
    //  }
    //)
    // => Void    // place.distance created
    function createDistanceProperty(places, currentPosition) {
      angular.forEach(places, (place) => {
        let geoJSON = place.geoJSON;
        let placeLongitude = geoJSON.coordinates[0];
        let placeLatitude = geoJSON.coordinates[1];
        var distance = service.between({
          latitude: placeLatitude,
          longitude: placeLongitude
        }, {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude
        });
        place.distance = distance;
      });
    }

  }
})(angular);
