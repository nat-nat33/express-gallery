'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const pkg = require('./package.json');
const os = require('os');

var oSystem;

if (os.type() === 'Linux'){
  oSystem = 'google-chrome';
}
else {
  oSystem = 'google chrome';
}

gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script : 'server.js',
    nodeArgs : ['--debug']
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy : 'http://localhost:3000',
    files : ['public/**/*.*'],
    browser : oSystem,
    port : 7000
  });
});

gulp.task('sass', function () {
  return gulp.src('./scss/*.scss')
      .pipe(sass({
        errLogToConsole : true,
        sourceComments : true,
        includePaths : ['bower_components/foundation/scss']
      }).on('error', sass.logError))
      .pipe(gulp.dest('./public/css'))
      .pipe(reload({ stream : true }));
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./public/**/*.*').on('change', reload);
});

gulp.task('default', ['watch', 'sass', 'browser-sync']);
