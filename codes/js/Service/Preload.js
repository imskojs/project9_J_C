// Preload photos no longer used. use before enter init() and after enter bind approach;
// Preload.assets are used in app.js to load everything when app starts, automatically done
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Preload', Preload);

  Preload.$inject = [
    '$q', '$filter', '$window'
  ];

  function Preload(
    $q, $filter, $window
  ) {

    var _ = $window._;

    var service = {
      photos: photos,
      assets: assets
    };

    return service;

    //====================================================
    //  Implementation
    //====================================================
    function photos(arrayOfObjsWithPhotosArray, cloudinaryFilterName, onlyFirstOnesBool, neverMind) {
      if (neverMind) {
        return [];
      }
      var urls = getPhotos(arrayOfObjsWithPhotosArray, cloudinaryFilterName, onlyFirstOnesBool);
      var promises = [];
      angular.forEach(urls, function(url) {
        var deferred = $q.defer();
        var img = new $window.Image();
        img.onload = onImageLoad(deferred);
        img.onerror = onImageError(deferred, url);
        promises.push(deferred.promise);
        img.src = url;
      });
      return $q.all(promises);
    }

    function assets(fileUrls) {
      var promises = [];
      // var images = [];
      angular.forEach(fileUrls, function(url) {
        var deferred = $q.defer();
        var img = new $window.Image();
        img.onload = onImageLoad(deferred);
        img.onerror = onImageError(deferred, url);
        promises.push(deferred.promise);
        img.src = url;
        // images.push(img);
      });
      return $q.all(promises);
    }

    //====================================================
    //  Helper
    //====================================================
    function onImageLoad(deferred) {
      return function() {
        deferred.resolve();
      };
    }

    function onImageError(deferred, url) {
      return function() {
        deferred.reject(url);
      };
    }

    function getPhotos(posts, cloudinaryFilterName, onlyFirstOnesBool) {
      var preProcessedUrls = [];
      // make it work for single object
      if (!Array.isArray(posts)) {
        posts = [posts];
      }
      var arrayOfUrls = _.pluck(posts, 'photos');
      angular.forEach(arrayOfUrls, function(photos) {
        var urls = _.pluck(photos, 'url');
        if (onlyFirstOnesBool) {
          var first = urls[0];
          urls = [first];
        }
        preProcessedUrls = preProcessedUrls.concat(urls);
      });
      var urls = _.map(preProcessedUrls, function(url) {
        return $filter(cloudinaryFilterName)(url);
      });
      urls = _.filter(urls, function(url) {
        return url != null;
      });
      return urls;
    }

  } // Service END
})(angular);
