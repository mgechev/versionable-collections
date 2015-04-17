var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var umd = require('gulp-umd');

gulp.task('test', function () {
  'use strict';
  return gulp.src('./test/*.spec.js')
    .pipe(jasmine());
});

gulp.task('concat', function () {
  'use strict';
  return gulp
    .src([
      './src/utils.js',
      './src/**/*.js'
    ])
    .pipe(umd({
      exports: function () {
        return 'VersionableList';
      },
      namespace: function () {
        return 'VersionableList';
      }
    }))
    .pipe(concat('versionable-collections.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['concat'], function () {
  'use strict';
  return gulp.src(
    './dist/versionable-collections.js'
  )
  .pipe(uglify())
  .pipe(rename('versionable-collections.min.js'))
  .pipe(gulp.dest('./dist/'));
});
