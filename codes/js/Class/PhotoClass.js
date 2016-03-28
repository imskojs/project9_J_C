// Utility
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('PhotoClass', PhotoClass);

  PhotoClass.$inject = [
    '$window', '$timeout',
    'Message', 'Upload',
    'SERVER_URL'
  ];

  function PhotoClass(
    $window, $timeout,
    Message, Upload,
    SERVER_URL
  ) {
    var _ = $window._;

    return class Photo {


      // Usage: beforeBindData in Update View Or onSelection of Image File.
      // Util.PhotoClass.pushToPreviews(post.photos, vm.Model, 'postPhotosPreview', 10, true)
      // Util.bindData(post, vm.Model, 'post')
      // Or:
      // Util.PhotoClass.pushToPreviews(post.photo, vm.Model, 'postPhotoPreview', 5, true)
      // Util.bindData(post, vm.Model, 'post')
      // Or:
      // Util.PhotoClass.pushToPreviews(File, vm.Model, 'postPhotoPreview', 5, false)
      //( 
      //  required imagesOrImage: Array<Photo> | Photo | Array<Blob | File> | Blob | File, 
      //  required vmModel: Object, 
      //  required nameOfPreviewsArrayInVmModel: String,
      //  required maxPreviewNumber: Number 
      //  optional resetPreviews: Boolean default false
      //)
      addToPreviews(imagesOrImage, vmModel, nameOfPreviewsArrayInVmModel, maxPreviewNumber, resetPreviews) {
        // imagesOrImage is undefined.
        if (!imagesOrImage) {
          console.log('noPhoto --PhotoClass.pushToPreviews--');
          return false;
        }
        // imagesOrImage is empty array.
        if (Array.isArray(imagesOrImage) && imagesOrImage.length === 0) {
          console.log('emptyPhotosArray --PhotoClass.pushToPreviews--');
          return false;
        }
        // vmModel not specified
        if (!vmModel) {
          console.log('noVmModel --PhotoClass.pushToPreviews--');
          return false;
        }
        // property name of previews array not specified
        if (!nameOfPreviewsArrayInVmModel) {
          console.log('noNameOfPreviewsArrayInVmModel --PhotoClass.pushToPreviews --');
          return false;
        }
        // imagesOrImage is a image (one Photo || one Blob).
        if (!Array.isArray(imagesOrImage)) {
          imagesOrImage = [imagesOrImage];
        }
        // imagesOrImage is photos, that's what we want so do nothing.

        // if nameOfPreviewsArrayInVmModel does not exist in vmModel, create one and assign empty array.
        if (!vmModel[nameOfPreviewsArrayInVmModel]) {
          vmModel[nameOfPreviewsArrayInVmModel] = [];
        }
        // vmModel[nameOfPreviewsArrayInVmModel] is not empty, empty it.
        if (vmModel[nameOfPreviewsArrayInVmModel].length !== 0 && resetPreviews) {
          angular.copy([], vmModel[nameOfPreviewsArrayInVmModel]);
        }
        // if reached this step then imagesOrImage has Array<Photo> with at least one Photo
        //and vmModel[nameOfPreviewsArrayInVmModel] is an empty array
        //so push Photos to previews array in vmModel.
        $timeout(function() {
          angular.forEach(imagesOrImage, (image) => {
            vmModel[nameOfPreviewsArrayInVmModel].push(image);
          });
          // if maxPreviewNumber exceeded.
          if (vmModel[nameOfPreviewsArrayInVmModel].length > maxPreviewNumber) {
            Message.alert('사진수 초과', `사진은 최대 ${maxPreviewNumber}개 까지 가능합니다.`);
            vmModel[nameOfPreviewsArrayInVmModel].splice(maxPreviewNumber, vmModel[nameOfPreviewsArrayInVmModel].length);
          }
        }, 0);
      }


      // Usage:
      // <div ng-repeat="image in vm.Model.postPhotosPreview"
      //   ng-click="removeFromPreviews(vm.Model.postPhotosPreview, $index)"
      // >
      //   <img ng-if="!image.id"
      //     ngf-src="image"
      //   >
      //   <img ng-if="image.id"
      //     ng-src="{{image.url}}"
      //   >
      // </div>
      // Or;
      // <div ng-click="removeFromPreviews(vm.Model.postPhotosPreview)">
      //   <img ng-if="!vm.Model.postPhotosPreview[0].id"
      //     ngf-src="vm.Model.postPhotosPreview[0]"
      //   >
      //   <img ng-if="vm.Model.postPhotosPreview[0].id"
      //     ng-src="{{vm.Model.postPhotosPreview[0].url}}"
      //   >
      // </div>
      //( 
      //  required previewsArray: Array<Photo> | Photo | Array<Blob | File> | Blob | File, 
      //  optional $index: Number, 
      //)
      removeFromPreviews(previewsArray, $index) {
        if (!previewsArray) {
          console.log('noPreviewsArray --PhotoClass.removeFromPreviews--');
          return false;
        }
        if (!Array.isArray(previewsArray)) {
          console.log('previewsArrayNonArray --PhotoClass.removeFromPreviews--');
          return false;
        }
        if ($index === undefined) {
          $index = 0;
        }
        $timeout(function() {
          previewsArray.splice($index, 1);
        }, 0);
      }


      // Note: Requests Create, Update, Destroy Photos to Server
      // Usage:
      // Util.PhotoClass.upsertPhotos(postPhotosPreview, post.photos)
      // Util.PhotoClass.upsertPhotos(postPhotosPreview, post.photos, [{photo1Property: 'test1'}, {file2Property: 'test2'}])
      //(
      //  required previewsArray: Array<Photo|Blob|File> | []
      //  optional previewsArray: Array<Photo> | Photo | [] | undefined
      //  optional extraPhotoPropertiesArray: Array<Object> | undefined
      //)
      upsertPhotos(previewsArray, originalPhotoOrPhotosInServer, extraPhotoPropertiesArray) {
        if (!previewsArray) {
          console.log('noPreviewsArray --PhotoClass.upsertPhotos--');
          return false;
        }
        if (!Array.isArray(previewsArray)) {
          console.log('previewsArrayNonArray --PhotoClass.upsertPhotos--');
          return false;
        }
        // no original hence no photos in the server hence creation only
        if (!originalPhotoOrPhotosInServer) {
          originalPhotoOrPhotosInServer = [];
        }
        if (extraPhotoPropertiesArray) {
          if (!Array.isArray(extraPhotoPropertiesArray)) {
            console.log('extraPhotoPropertiesArrayIfExistsMustBeArray --PhotoClass.upsertPhotos--');
            return false;
          } else if (previewsArray.length !== extraPhotoPropertiesArray.length) {
            console.log('extraPhotoPropertiesArrayIfExistsMustHaveSameLengthAsPreviewsArray --PhotoClass.upsertPhotos--');
            return false;
          }
        }
        // Process Destroy: Get Photo Ids to delete from originPhotosInServer
        var photosInPreviewsArray = [];
        angular.forEach(previewsArray, (photoOrFile) => {
          if (photoOrFile.id) { // if photo, as only Photo has id 
            photosInPreviewsArray.push(photoOrFile);
          }
        });
        var photoIdsFromPreviewsArray = _.map(photosInPreviewsArray, 'id');
        var photoIdsFromOriginalPhotos = _.map(originalPhotoOrPhotosInServer, 'id');
        var photoIdsToDestroy = _.difference(photoIdsFromOriginalPhotos, photoIdsFromPreviewsArray); // destroy
        // Process Upsert: 
        var toUploadFiles = []; // Files to Upload
        var toUploadFilesProperty = []; // create
        var toUpdatePhotosObj = {}; // update
        angular.forEach(previewsArray, (photoOrFile, i) => {
          // Properties to add to Creating or updating photos, Photos will always have index.
          let extraPhotoProperty = {
            index: i
          };
          if (extraPhotoPropertiesArray && extraPhotoPropertiesArray[i]) {
            angular.extend(extraPhotoProperty, extraPhotoPropertiesArray[i]);
          }
          // update already existing Photo
          if (photoOrFile.id) { // is a Photo
            toUpdatePhotosObj[photoOrFile.id] = extraPhotoProperty;
            // Create new Photo
          } else { // is a File
            toUploadFilesProperty.push(extraPhotoProperty);
            toUploadFiles.push(photoOrFile);
          }
        });
        let uploadOptions = {
          url: SERVER_URL + '/photo/upsertPhotos',
          method: 'PUT',
          file: toUploadFiles, //[File]
          fields: {
            query: {
              create: toUploadFilesProperty, //[{index}]
              destroy: photoIdsToDestroy, // [id]
              update: toUpdatePhotosObj // {id:{index}}
            }
          },
          headers: {
            enctype: "multipart/form-data"
          }
        };
        return Upload.upload(uploadOptions)
          .then((dataWrapper) => {
            let idsWrapper = dataWrapper.data;
            console.log("idsWrapper :::\n", idsWrapper);
            // Photos existing in server
            return idsWrapper;
          });
      }

    }; //PhotoClass End
  } // Service END
})(angular);




// (function(angular) {
//   'use strict';

//   angular.module('app')
//     .factory('PhotoClass', PhotoClass);

//   PhotoClass.$inject = [
//     '$window',
//     'Message'
//   ];

//   function PhotoClass(
//     $window,
//     Message
//   ) {
//     var _ = $window._;

//     return class Photo {
//       // (banner.photos, Model.images)
//       // on banner response push photos to images
//       pushToImages(imagesArray, photos) {
//         if (!Array.isArray(photos)) {
//           photos = photos ? [photos] : [];
//         }
//         if (!Array.isArray(imagesArray)) {
//           imagesArray = [];
//         }
//         angular.forEach(photos, (photo) => {
//           imagesArray.push(photo);
//         });
//       }

//       // on deselect photo remove photo from images      ?, and add photo.id to destroy 
//       // on deselect file remove file from images
//       deselectImage(imagesArray, $index) {
//         if (imagesArray[$index].id) { // is a photo
//           imagesArray.splice($index, 1);
//         } else if (imagesArray[$index].name || imagesArray[$index].blobUrl) { // is a file/blob
//           imagesArray.splice($index, 1);
//         } else {
//           console.log("'not a photo/file/blob --deselectImage--'");
//           return false;
//         }
//       }

//       // on new tempFiles push to images i.e on ngf-select;
//       selectImage(imagesArray, tempFiles, limit) {
//         if (!Array.isArray(imagesArray)) {
//           imagesArray = [];
//           console.log('vm.Model.images not defined');
//         }
//         if (!Array.isArray(tempFiles)) {
//           tempFiles = [];
//           console.log('vm.Model.tempFiles not defined');
//         }
//         angular.forEach(tempFiles, (file) => {
//           imagesArray.push(file);
//         });
//         if (imagesArray.length > limit) {
//           Message.alert('사진수 초과', `사진은 최대 ${limit}개 까지만 업로드 가능합니다.`);
//           imagesArray.splice(limit, imagesArray.length);
//         }
//       }

//       // onBefore request, loop images and find index of file 
//       // and add {index: $indexOfFile} to create
//       processCreate(imagesArray, createArray, files) {
//         if (!Array.isArray(files)) {
//           files = [];
//         }
//         angular.forEach(imagesArray, (image, i) => {
//           if (!image.id) {
//             files.push(image);
//             createArray.push({ index: i });
//           }
//         });
//       }

//       // onBefore request, find photos to delete and add to delete array
//       // finde difference between images and photos and create destroy array
//       processDestroy(imagesArray, destroyArray, initialPhotos) {
//         if (!Array.isArray(initialPhotos)) {
//           initialPhotos = initialPhotos ? [initialPhotos] : [];
//         }
//         if (!Array.isArray(destroyArray)) {
//           destroyArray = [destroyArray];
//         }
//         let photosArray = [];
//         angular.forEach(imagesArray, (image) => {
//           if (image.id) {
//             photosArray.push(image);
//           }
//         });
//         let idInImages = _.map(photosArray, 'id');
//         let idInInitialPhotos = _.map(initialPhotos, 'id');
//         let differences = _.difference(idInInitialPhotos, idInImages);
//         angular.forEach(differences, (toDeleteId) => {
//           destroyArray.push(toDeleteId);
//         });
//       }

//       // on response of created photoIds create array of photoIds with exsiting non-file images
//       // prepend to photos.
//       createPhotoIds(imagesArray, initialPhotos, createdPhotoIds) {
//         if (!initialPhotos) {
//           initialPhotos = [];
//         }
//         if (!Array.isArray(initialPhotos)) {
//           initialPhotos = [initialPhotos];
//         }
//         let photosArray = [];
//         angular.forEach(imagesArray, (image) => {
//           if (image.id) {
//             photosArray.push(image);
//           }
//         });
//         let idInImages = _.map(photosArray, 'id');
//         let idInPhotos = _.map(initialPhotos, 'id');
//         let intersection = _.intersection(idInImages, idInPhotos);
//         let photos = _.concat(intersection, createdPhotoIds);
//         return photos;
//       }
//     };

//   } // Service END
// })(angular);
