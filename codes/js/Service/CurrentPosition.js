(function(angular) {
  'use strict';

  angular.module('app')
    .factory('CurrentPosition', CurrentPosition);

  CurrentPosition.$inject = [
    '$window', '$cordovaGeolocation', '$q',
    'Message', 'AppStorage'
  ];

  function CurrentPosition(
    $window, $cordovaGeolocation, $q,
    Message, AppStorage
  ) {
    var daum = $window.daum;
    var geocoder = new daum.maps.services.Geocoder();
    var service = {
      set: set
    };

    return service;

    //(
    //  toBindObj: {latitude: Integer, longitude: Integer} | Array
    //)
    // if toBindObj not defined makes AppStorage.currentPosition = {}
    function set(toBindObj, noLoadingBar) {
      if (!noLoadingBar) {
        Message.loading();
      }
      return $cordovaGeolocation.getCurrentPosition({
          maximumAge: 1000,
          timeout: 7000
        })
        .then(function(position) {
          console.log("position :::\n", position);
          if (position.coords == null) {
            Message.alert(
              '위치 공유가 꺼져있습니다.',
              '위치 공유를 켜주세요.'
            );
            console.log("err -- CurrentPosition.set --:::\n", 'noPlace');
            return $q.reject({ message: 'geolocationOff' });
          }
          if (Array.isArray(toBindObj)) {
            toBindObj[0] = Number(position.coords.longitude);
            toBindObj[1] = Number(position.coords.latitude);
          } else if (toBindObj) {
            toBindObj.longitude = Number(position.coords.longitude);
            toBindObj.latitude = Number(position.coords.latitude);
          } else {
            AppStorage.longitude = Number(position.coords.longitude);
            AppStorage.latitude = Number(position.coords.latitude);
          }
          var coords = new daum.maps.LatLng(
            Number(position.coords.latitude),
            Number(position.coords.longitude)
          );
          var deferred = $q.defer();
          geocoder.coord2addr(coords, function(status, result) {
            if (status === daum.maps.services.Status.OK) {
              deferred.resolve(toBindObj);
              AppStorage.currentAddress = result[0].fullName;
            } else {
              deferred.reject({ message: 'noAddress' });
            }
          });
          return deferred.promise;
        })
        .then((toBindObj) => {
          if (!noLoadingBar) {
            Message.hide();
          }
          return toBindObj;
        })
        .catch(function(err) {
          console.log("err -- CurrentPosition.set --:::\n", err);
          if (!noLoadingBar) {
            Message.hide();
          }
          Message.alert(
            '위치 공유가 꺼져있습니다.',
            '위치 공유를 켜주세요.'
          );
          return $q.reject({ message: 'geolocationOff' });
        });
    }


  }
})(angular);
