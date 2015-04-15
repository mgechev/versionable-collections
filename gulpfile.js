var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('test', function () {
  'use strict';
  return gulp.src('./test/*.spec.js')
    .pipe(jasmine());
});
