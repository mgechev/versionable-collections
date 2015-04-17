var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');
var replace = require('gulp-replace');

gulp.task('test', ['concat'], function () {
  'use strict';
  return gulp.src('./test/*.spec.js')
    .pipe(jasmine());
});

gulp.task('concat', function () {
  'use strict';
  return gulp
    .src([
      './src/utils.js',
      './src/versionable-list.js'
    ])
    .pipe(concat('versionable-collections.js'))
    .pipe(replace(/('|")use strict('|");?/g, ''))
    .pipe(wrap({ src: './template.tpl' }, {
      exports: 'exports.VersionableList = VersionableList;'
    }, {
      variable: 'data'
    }))
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

gulp.task('concat:angular', function () {
  'use strict';
  return gulp
    .src([
      './src/utils.js',
      './src/versionable-list.js',
      './src/versionable-collections.angular.js'
    ])
    .pipe(concat('versionable-collections.angular.js'))
    .pipe(replace(/('|")use strict('|");?/g, ''))
    .pipe(wrap({ src: './template.tpl' }, {
      exports: ''
    }, {
      variable: 'data'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build:angular', ['concat:angular'], function () {
  'use strict';
  return gulp.src(
    './dist/versionable-collections.angular.js'
  )
  .pipe(uglify())
  .pipe(rename('versionable-collections.angular.min.js'))
  .pipe(gulp.dest('./dist/'));
});
