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
      between: $window.geolib.getDistance
    };

    return service;

  }
})(angular);
