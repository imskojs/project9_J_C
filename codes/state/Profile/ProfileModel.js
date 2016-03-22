(function() {
  'use strict';

  angular.module('app')
    .factory('ProfileModel', ProfileModel);

  ProfileModel.$inject = [];

  function ProfileModel() {

    var Model = {
      handle: 'profile',
      loading: false,
      hopeNickname: '',

      images: [],
      files: [],
      create: [],
      // tempFiles: [],
      // destroy: [],

      user: {
        username: '',
        email: '',
        nickname: '',
        profilePhoto: {
          url: ''
        },
        devices: {},
        favorites: {},
        //====================================================
        //  Not used
        //====================================================
        password_reset_code: '',
        password_reset_time: 0,
        accesscount: 0,
      },
    };

    return Model;
  }
})();