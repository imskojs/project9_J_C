// Utility
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('PhotoClass', PhotoClass);

  PhotoClass.$inject = [
    '$window',
    'Message'
  ];

  function PhotoClass(
    $window,
    Message
  ) {
    var _ = $window._;

    return class Photo {
      // (banner.photos, Model.images)
      // on banner response push photos to images
      pushToImages(imagesArray, photos) {
        if (!Array.isArray(photos)) {
          photos = photos ? [photos] : [];
        }
        if (!Array.isArray(imagesArray)) {
          imagesArray = [];
        }
        angular.forEach(photos, (photo) => {
          imagesArray.push(photo);
        });
      }

      // on deselect photo remove photo from images      ?, and add photo.id to destroy
      // on deselect file remove file from images
      deselectImage(imagesArray, $index) {
        if (imagesArray[$index].id) { // is a photo
          imagesArray.splice($index, 1);
        } else if (imagesArray[$index].name || imagesArray[$index].blobUrl) { // is a file/blob
          imagesArray.splice($index, 1);
        } else {
          console.log("'not a photo/file/blob --deselectImage--'");
          return false;
        }
      }

      // on new tempFiles push to images i.e on ngf-select;
      selectImage(imagesArray, tempFiles, limit) {
        if (!Array.isArray(imagesArray)) {
          imagesArray = [];
          console.log('vm.Model.images not defined');
        }
        if (!Array.isArray(tempFiles)) {
          tempFiles = [];
          console.log('vm.Model.tempFiles not defined');
        }
        angular.forEach(tempFiles, (file) => {
          imagesArray.push(file);
        });
        if (imagesArray.length > limit) {
          Message.alert('사진수 초과', `사진은 최대 ${limit}개 까지만 업로드 가능합니다.`);
          imagesArray.splice(limit, imagesArray.length);
        }
      }

      // onBefore request, loop images and find index of file
      // and add {index: $indexOfFile} to create
      processCreate(imagesArray, createArray, files) {
        if (!Array.isArray(files)) {
          files = [];
        }
        angular.forEach(imagesArray, (image, i) => {
          if (!image.id) {
            files.push(image);
            createArray.push({ index: i });
          }
        });
      }

      // onBefore request, find photos to delete and add to delete array
      // finde difference between images and photos and create destroy array
      processDestroy(imagesArray, destroyArray, initialPhotos) {
        if (!Array.isArray(initialPhotos)) {
          initialPhotos = initialPhotos ? [initialPhotos] : [];
        }
        if (!Array.isArray(destroyArray)) {
          destroyArray = [destroyArray];
        }
        let photosArray = [];
        angular.forEach(imagesArray, (image) => {
          if (image.id) {
            photosArray.push(image);
          }
        });
        let idInImages = _.map(photosArray, 'id');
        let idInInitialPhotos = _.map(initialPhotos, 'id');
        let differences = _.difference(idInInitialPhotos, idInImages);
        angular.forEach(differences, (toDeleteId) => {
          destroyArray.push(toDeleteId);
        });
      }

      // on response of created photoIds create array of photoIds with exsiting non-file images
      // prepend to photos.
      createPhotoIds(imagesArray, initialPhotos, createdPhotoIds) {
        if (!initialPhotos) {
          initialPhotos = [];
        }
        if (!Array.isArray(initialPhotos)) {
          initialPhotos = [initialPhotos];
        }
        let photosArray = [];
        angular.forEach(imagesArray, (image) => {
          if (image.id) {
            photosArray.push(image);
          }
        });
        let idInImages = _.map(photosArray, 'id');
        let idInPhotos = _.map(initialPhotos, 'id');
        let intersection = _.intersection(idInImages, idInPhotos);
        let photos = _.concat(intersection, createdPhotoIds);
        return photos;
      }
    };

  } // Service END
})(angular);