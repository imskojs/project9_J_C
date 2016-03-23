/* jshint ignore:start */
var Promise = require('bluebird');
/* jshint ignore:end */
var purify = require('purify-css');
var glob = require('glob');
var uglify = require('uglify-js');
var fs = require('fs');
var sh = require('shelljs');
var del = require('del');

var doneStates = [];
var platform = process.argv[2];
// devCode();
if (platform === 'dev' || platform === 'development' || platform === 'revert') {
  return runGulp()
    .then(function() {
      return devCode();
    })
    .catch(function(err) {
      console.log("err :::\n", err);
    });
} else if (platform === 'ios') {
  return prepare();
} else if (platform === 'android') {
  return prepare();
} else {
  console.log('please specify platform\n EXAMPLE) \n node release.js android \n node release.js ios \n node release.js dev "');
  return false;
}
//====================================================
//  TODO
//====================================================
// then cordova build --release android
// then jarsign
// then zipalign
// then slackcat
// then rm .apk in applicatKeyStore

// After gulp
function prepare() {
  // purify css
  return Promise.resolve()
    .then(function() {
      return runGulp('--production');
    })
    .then(function() {
      return purifyAndMinifyCss();
    })
    .then(function(message) {
      return uglifyJs(message);
    })
    .then(function(message) {
      return releaseCode(message);
    })
    .then(function(message) {
      return deleteFiles(message);
    })
    .then(function(message) {
      doneStates.push(message);
      return runCordova(message);
    })
    .then(function(message) {
      console.log("message :::\n", message);
      doneStates.push(message);
      return Promise.all([runGulp(), devCode()]);
    })
    .catch(function(err) {
      console.log("err :::\n", err);
      devCode();
      if (doneStates.indexOf('fileDeleteDone') !== -1) {
        runGulp();
      }
      return Promise.reject(err);
    });
}

function releaseCode(message) {
  console.log("message :::\n", message);
  doneStates.push(message);
  // sh.sed(
  //   '-i',
  //   /  <script src="cordova\.js"><\/script>/,
  //   '  <!-- <script src="cordova.js"></script> -->',
  //   'www/index.html'
  // );
  sh.sed(
    '-i',
    /  <script src="lib\/lib\.all\.js"><\/script>/,
    '  <!-- <script src="lib/lib.all.js"></script> -->',
    'www/index.html'
  );
  sh.sed(
    '-i',
    /  <script src="view\/ngTemplates.js"><\/script>/,
    '  <!-- <script src="view/ngTemplates.js"></script> -->',
    'www/index.html'
  );
  sh.sed(
    '-i',
    /  <script src="js\/app\.all\.js"><\/script>/,
    '  <!-- <script src="js/app.all.js"></script> -->',
    'www/index.html'
  );
  sh.sed(
    '-i',
    /  <link href="css\/ionic\.app\.all\.css" rel="stylesheet">/,
    '  <!-- <link href="css/ionic.app.all.css" rel="stylesheet"> -->',
    'www/index.html'
  );
  sh.sed(
    '-i',
    /  <!-- <script src="c8js\.com\.js"><\/script> -->/,
    '  <script src="c8js.com.js"></script>',
    'www/index.html'
  );
  sh.sed(
    '-i',
    /  <!-- <link href="c8js\.com\.css" rel="stylesheet"> -->/,
    '  <link href="c8js.com.css" rel="stylesheet">',
    'www/index.html'
  );
  return 'indexViewDone';
}

function devCode() {
  // sh.sed(
  //   '-i',
  //   /  <!-- <script src="cordova\.js"><\/script> -->/,
  //   '  <script src="cordova.js"></script>',
  //   'www/index.html'
  // );
  sh.sed(
    '-i',
    /  <!-- <script src="lib\/lib\.all\.js"><\/script> -->/,
    '  <script src="lib/lib.all.js"></script>',
    'www/index.html'
  );
  sh.sed(
    '-i',
    /  <!-- <script src="view\/ngTemplates.js"><\/script> -->/,
    '  <script src="view/ngTemplates.js"></script>',
    'www/index.html'
  );
  sh.sed(
    '-i',
    /  <!-- <script src="js\/app\.all\.js"><\/script> -->/,
    '  <script src="js/app.all.js"></script>',
    'www/index.html'
  );
  sh.sed(
    '-i',
    /  <!-- <link href="css\/ionic\.app\.all\.css" rel="stylesheet"> -->/,
    '  <link href="css/ionic.app.all.css" rel="stylesheet">',
    'www/index.html'
  );
  sh.sed(
    '-i',
    /  <script src="c8js\.com\.js"><\/script>/,
    '  <!-- <script src="c8js.com.js"></script> -->',
    'www/index.html'
  );
  sh.sed(
    '-i',
    /  <link href="c8js\.com\.css" rel="stylesheet">/,
    '  <!-- <link href="c8js.com.css" rel="stylesheet"> -->',
    'www/index.html'
  );
}

function runGulp(productionTrue) {
  var deferred = Promise.pending();
  var command;
  if (productionTrue) {
    command = 'gulp release --production';
  } else {
    command = 'gulp release';
  }
  sh.exec(command, function(code, stdout, stderr) {
    if (code !== 0) {
      deferred.reject(stderr);
    } else {
      deferred.resolve('gulpDone');
    }
  });
  return deferred.promise;
}


function purifyAndMinifyCss() {
  var deferred = Promise.pending();
  glob('codes/**/*.{html,js}', function(err, files) {
    if (err) {
      return deferred.reject(err);
    }
    console.log("files :::\n", files);
    console.log('purifying above files, this may take a while, like 2~3 mins');
    var css = ['www/css/ionic.app.all.css'];
    var content = files;
    var cssOptions = {
      minify: true,
      output: 'www/c8js.com.css',
      rejected: true
    };
    purify(content, css, cssOptions);
    deferred.resolve('cssPurificationDone');
  });
  return deferred.promise;
}

function uglifyJs(message) {
  console.log("message :::\n", message);
  doneStates.push(message);
  // cordova, lib, view, app js uglify
  var deferred = Promise.pending();
  console.log('uglifying js files(cordova,lib,ngTemplate,app), this may take a while, like ~1 min');
  var minified = uglify.minify([
    // 'platforms/android/assets/www/cordova.js',
    'www/lib/lib.all.js',
    'www/view/ngTemplates.js',
    'www/js/app.all.js',
  ]);
  fs.writeFile('www/c8js.com.js', minified.code, 'utf8', function(err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve('jsUglificationDone');
    }
  });
  return deferred.promise;
}

function deleteFiles(message) {
  console.log("message :::\n", message);
  doneStates.push(message);
  del.sync([
    'www/css/ionic.app.all.css',
    'www/js/app.all.js',
    'www/lib/lib.all.js',
    'www/view/ngTemplates.js',
  ]);
  return 'fileDeleteDone';
}

function runCordova(message) {
  console.log("message :::\n", message);
  doneStates.push(message);
  var deferred = Promise.pending();
  if (platform === 'android') {
    sh.exec('cordova build --release android', function(code, stdout, stderr) {
      if (code !== 0) {
        deferred.reject(stderr);
      } else {
        deferred.resolve('buildDone');
      }
    });
  } else if (platform === 'ios') {
    sh.exec('ionic build ios', function(code, stdout, stderr) {
      if (code !== 0) {
        deferred.reject(stderr);
      } else {
        deferred.resolve('buildDone');
      }
    });
  }

  return deferred.promise
    .then(function() {
      var deferred = Promise.pending();
      if (platform === 'ios') {
        sh.exec('open -a Xcode', function(code, stdout, stderr) {
          if (code !== 0) {
            deferred.reject(stderr);
          } else {
            deferred.resolve('buildDone');
          }
        });
      } else {
        deferred.resolve('buildDone');
      }
      return deferred.promise;
    });
}