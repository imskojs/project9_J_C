(function() {
  'use strict';

  angular.module('app')
    .factory('ProfileModel', ProfileModel);

  ProfileModel.$inject = [];

  function ProfileModel() {

    var Model = {
      loading: false,
      hopeNickname: '',

      user: {
        username: {
          type: 'string',
          unique: true,
          index: true
        },
        email: {
          type: 'email',
          unique: true,
          index: true
        },

        // Properties
        nickname: {
          // unique: true,
          type: 'String'
        },

        profilePhoto: {
          model: 'Photo'
        },

        devices: {
          collection: 'Device',
          via: 'user'
        },

        //====================================================
        //  Not used
        //====================================================
        password_reset_code: {
          type: 'string'
        },
        password_reset_time: {
          type: 'integer'
        },
        accesscount: {
          type: 'integer'
        },

      }
    };

    return Model;
  }
})();
