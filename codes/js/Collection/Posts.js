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
      '/:find' +
      '/:findOne' +
      // '/:create' +
      // '/:update' +
      '/:destroy';

    var params = {
      find: '@find',
      findOne: '@findOne',
      // create: '@create',
      // update: '@update',
      destroy: '@destroy'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },
      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },
      // create: {
      //   method: 'POST',
      //   params: {
      //     create: 'create'
      //   }
      // },
      // update: {
      //   method: 'PUT',
      //   params: {
      //     update: 'update'
      //   }
      // },
      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      }
    };

    var service = $resource(postUrl, params, actions);
    service.create = create;
    service.update = update;

    return service;

    // (param: null, body: {files: base64[], query: {property: any}})
    //=> Promise
    function create(param, body) {
      var photoPromise = Photo.post('/post/create', body, 'POST');
      return {
        $promise: photoPromise
      };
    }

    // (param: null, body: {files: base64[], query: {property: any}})
    //=> Promise
    function update(param, body) {
      var photoPromise = Photo.post('/post/update', body, 'PUT');
      return {
        $promise: photoPromise
      };
    }

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
