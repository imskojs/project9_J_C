(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Comments', Comments);

  Comments.$inject = [
    '$resource',
    'SERVER_URL', 'Photo'
  ];

  function Comments(
    $resource,
    SERVER_URL, Photo
  ) {

    var commentUrl = SERVER_URL + '/comment' +
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

    // (param: null, body: {files: base64[], query: {property: any})
    //=> Promise
    function create(param, body) {
      var photoPromise = Photo.post('/comment/create', body, 'POST');
      return {
        $promise: photoPromise
      };
    }

    // (param: null, body: {files: base64[], query: {property: any})
    //=> Promise
    function update(param, body) {
      var photoPromise = Photo.post('/comment/update', body, 'PUT');
      return {
        $promise: photoPromise
      };
    }


    var service = $resource(commentUrl, params, actions);
    service.create = create;
    service.update = update;

    return service;

  }
})(angular);
