//<p>{{post.owner | GetName}}</p>
(function(angular) {
  'use strict';
  angular.module('app')
    .filter('GetName', GetName);

  GetName.$inject = [];

  function GetName() {
    return function(user) {
      if (user.name) {
        return user.name;
      } else if (user.nickname) {
        return user.nickname;
      } else if (user.username) {
        return user.username;
      } else if (user.fullname) {
        return user.fullname;
      } else {
        return 'UserX';
      }
    };
  }
})(angular);
