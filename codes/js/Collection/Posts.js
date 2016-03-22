(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Posts', Posts);

  Posts.$inject = [
    '$resource',
    'SERVER_URL', 'Photo'
  ];

  function Posts(
    $resource,
    SERVER_URL, Photo
  ) {

    var postUrl = SERVER_URL + '/post' +
      '/:uri';

    var params = {
      uri: '@uri'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          uri: 'find'
        }
      },
      findOne: {
        method: 'GET',
        params: {
          uri: 'findOne'
        }
      },
      create: {
        method: 'POST',
        params: {
          uri: 'create'
        }
      },
      update: {
        method: 'PUT',
        params: {
          uri: 'update'
        }
      },
      destroy: {
        method: 'DELETE',
        params: {
          uri: 'destroy'
        }
      }
    };

    var service = $resource(postUrl, params, actions);

    return service;
  }
})(angular);
/**
 * Created by Seunghoon Ko on 10/10/2015
 * As part of applicat platform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Seunghoon Ko - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Seunghoon Ko <imskojs@gmail.com>, 10/10/2015
 *
 */
