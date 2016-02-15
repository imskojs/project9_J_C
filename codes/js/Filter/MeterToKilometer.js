//====================================================
//  Usage
//====================================================
// <p> {{diatanceInMeters | MeterToKilometer}} </p>
// if distance is bigger than 1000m it will convert it to km
(function(angular) {
  'use strict';
  angular.module('app')
    .filter('MeterToKilometer', MeterToKilometer);

  MeterToKilometer.$inject = [];

  function MeterToKilometer() {
    return function(input) {
      if (input >= 1000) {
        return (input / 1000).toFixed(2) + ' km';
      } else if (input === undefined) {
        return '0 m';
      } else {
        return input + ' m';
      }
    };
  }
})(angular);
