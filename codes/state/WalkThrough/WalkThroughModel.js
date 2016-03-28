(function() {
  'use strict';

  angular.module('app')
    .factory('WalkThroughModel', WalkThroughModel);

  WalkThroughModel.$inject = [];

  function WalkThroughModel() {

    var model = {
      imagePaths: [
        'img/walkthrough01.png',
        'img/walkthrough02.png',
        'img/walkthrough03.png',
        'img/walkthrough03.png'
      ]
    };
    return model;
  }
})();
