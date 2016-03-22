//<p>{{post.owner | GetPhoto}}</p>
(function(angular) {
  'use strict';
  angular.module('app')
    .filter('GetPhoto', GetPhoto);

  GetPhoto.$inject = [];

  function GetPhoto() {
    return function(user) {
      if (user.profilePhoto && user.profilePhoto.url) {
        return user.profilePhoto.url;
      } else if (user.profile_image) {
        return user.profile_image;
      } else {
        return 'img/defaultimg.png';
      }
    };
  }
})(angular);
