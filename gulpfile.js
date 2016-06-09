'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');

// Clean bundle
var del = require('del');

gulp.task('clean', function () {
  return del(['./public/scripts/bundle.js']);
});

// BROWSERIFY
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var hbsfy = require('hbsfy');
var gutil = require('gulp-util');


var bundler = browserify({
  entries: ['./src/index.js'],
  debug: true
});

bundler.transform(hbsfy);
bundler.on('log', gutil.log); // output build logs to terminal

// Build Task
gulp.task('build', ['clean'], function () {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    // set output filename
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/scripts'));
});

// SASS 
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 
// Watch Task
gulp.task('watch', function () {
  //watches sass
  gulp.watch('./sass/**/*.scss', ['sass']);
  //watches javascript files
  gulp.watch('./src/**/*', ['build']);
});

// DEFAULT TASK
gulp.task('default', ['sass','build', 'watch' ]);