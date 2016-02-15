(function(angular) {
  'use strict';
  angular.module('app')
    .filter('Cloudinary800', CloudinaryFilter.bind(null, 800))
    .filter('Cloudinary750', CloudinaryFilter.bind(null, 750))
    .filter('Cloudinary700', CloudinaryFilter.bind(null, 700))
    .filter('Cloudinary650', CloudinaryFilter.bind(null, 650))
    .filter('Cloudinary600', CloudinaryFilter.bind(null, 600))
    .filter('Cloudinary550', CloudinaryFilter.bind(null, 550))
    .filter('Cloudinary500', CloudinaryFilter.bind(null, 500))
    .filter('Cloudinary450', CloudinaryFilter.bind(null, 450))
    .filter('Cloudinary400', CloudinaryFilter.bind(null, 400))
    .filter('Cloudinary350', CloudinaryFilter.bind(null, 350))
    .filter('Cloudinary300', CloudinaryFilter.bind(null, 300))
    .filter('Cloudinary250', CloudinaryFilter.bind(null, 250))
    .filter('Cloudinary200', CloudinaryFilter.bind(null, 200))
    .filter('Cloudinary150', CloudinaryFilter.bind(null, 150))
    .filter('Cloudinary100', CloudinaryFilter.bind(null, 100))
    .filter('Cloudinary50', CloudinaryFilter.bind(null, 50));

  function CloudinaryFilter(size) {
    var matching = /upload/;
    return function(input) {
      if (input) {
        var index = input.search(matching);
        if (index !== -1) {
          return input.substring(0, index) + 'upload/c_scale,w_' + size + '/' + input.substring(input.lastIndexOf('/'));
        } else {
          return input;
        }
      } else if (input == null) {
        return null;
      } else {
        return input;
      }
    };
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
