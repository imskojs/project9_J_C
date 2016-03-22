var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var ngTemplate = require('gulp-ng-template');
var imageop = require('gulp-image-optimization');
var rename = require('gulp-rename');
var sh = require('shelljs');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var stripDebug = require('gulp-strip-debug');
var filenames = require('gulp-filenames');
var babel = require('gulp-babel');
var cached = require('gulp-cached');
var remember = require('gulp-remember');

var paths = {
  img: ['./codes/img/**/*.*'],
  view: ['./codes/**/*.html', '!./codes/lib/**'],
  sassLib: [
    // 3rd Part lib
    './codes/lib/ng-img-crop-full-extended/source/scss/ng-img-crop.scss',
    // ionic lib (imports)
    './codes/scss/00_variables.scss',
    './codes/scss/00_functions.scss',
    './codes/scss/00_ionicLib.scss',
  ],
  sass: [
    './codes/scss/00_variables.scss',
    './codes/scss/00_functions.scss',
    './codes/scss/01_backgroundColors.scss',
    './codes/scss/02_texts.scss',
    './codes/scss/03_images.scss',
    './codes/scss/04_icons.scss',
    './codes/scss/06_progressBars.scss',
    './codes/scss/07_shadows.scss',
    './codes/scss/08_radii.scss',
    './codes/scss/09_borders.scss',
    './codes/scss/10_positions.scss',
    './codes/scss/11_margins.scss',
    './codes/scss/12_paddings.scss',
    './codes/scss/13_widths.scss',
    './codes/scss/14_heights.scss',
    './codes/scss/15_flexboxes.scss',
    './codes/scss/20_popUpModalAnimations.scss',
    './codes/scss/30_touched.scss',
    './codes/state/**/*.scss',
    // './codes/scss/common.scss' // common.scss is not purified
  ],
  js: [
    './codes/js/app.js',
    './codes/js/route.js',
    './codes/js/Class/**/*.js',
    './codes/js/Config/**/*.js',
    './codes/js/Interceptor/**/*.js',
    './codes/js/Service/**/*.js',
    './codes/js/Directive/**/*.js',
    './codes/js/Filter/**/*.js',
    './codes/js/Collection/**/*.js',
    './codes/state/**/*.js'
  ],
  lib: [
    // Non-Angular 3rd Party Libraries
    // './codes/lib/jQuery/dist/jquery.js',
    './codes/lib/Geolib/src/geolib.js',
    './codes/lib/lodash/lodash.js',
    './codes/lib/moment/moment.js',
    './codes/lib/jsSHA/src/sha1.js',
    // Ionic/Angular Core
    './codes/lib/ionic/js/ionic.bundle.js',
    // Angular 3rd Party Libraries
    // './codes/lib/ng-img-crop-full-extended/compile/minified/ng-img-crop.js', // minification problem, included in index.html manually
    './codes/lib/ngstorage/ngStorage.js',
    './codes/lib/angular-resource/angular-resource.js',
    './codes/lib/ngCordova/dist/ng-cordova.js',
    './codes/lib/ng-file-upload//ng-file-upload.js'
  ]
};

gulp.task('lib', function(done) {
  gulp.src(paths.lib)
    .pipe(concat('lib.all.js'))
    .pipe(gulp.dest('./www/lib/'))
    .on('end', done);
});

gulp.task('view', function() {
  return gulp.src(paths.view)
    .pipe(ngTemplate({
      standalone: true,
      filePath: 'ngTemplates.js'
    }))
    .pipe(gulp.dest('./www/view/'));
});

gulp.task('sassLib', function(done) {
  gulp.src(paths.sassLib)
    .pipe(concat('ionic.lib.all.scss'))
    .pipe(gulp.dest('./codes/scss/'))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(concat('ionic.app.all.scss'))
    .pipe(gulp.dest('./codes/scss/'))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('sassCommon', function(done) {
  gulp.src([
    './codes/scss/00_variables.scss',
    './codes/scss/00_functions.scss',
    './codes/scss/common.scss'
  ])
    .pipe(concat('common.scss'))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('js', function(done) {
  gulp.src(paths.js)
    .pipe(cached('013_clientJooDang'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(remember('013_clientJooDang'))
    .pipe(concat('app.all.js'))
    .pipe(gulpif(argv.production, stripDebug()))
    .pipe(gulp.dest('./www/js/'))
    .on('end', done);
});

gulp.task('img', function(done) {
  gulp.src(paths.img)
    .pipe(filenames('images'))
    .pipe(imageop({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./www/img/'))
    .on('end', function() {
      var imageFileNames = filenames.get('images');
      var imageFilePaths = imageFileNames.map(function(fileName) {
        return 'img/' + fileName;
      });
      sh.sed('-i', /\[.*\]/, JSON.stringify(imageFilePaths), './codes/js/Config/Assets.js');
      done();
    });
});

gulp.task('compile', ['img', 'lib']);
gulp.task('default', ['view', 'sassLib', 'sass', 'sassCommon', 'js']);
// gulp release --production
gulp.task('release', ['lib', 'view', 'sassLib', 'sass', 'sassCommon', 'js']);

gulp.task('watch', function() {
  gulp.watch(paths.view, ['view']);
  gulp.watch(paths.sassLib, ['sassLib']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(['./codes/scss/00_variables.scss', './codes/scss/00_functions.scss', './codes/scss/common.scss'], ['sassCommon']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.lib, ['lib']);
});