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
      './lib/utils.js',
      './lib/versionable-collection.js',
      './lib/versionable-list.js',
      './lib/versionable-map.js'
    ])
    .pipe(concat('versionable-collections.js'))
    .pipe(replace(/('|")use strict('|");?/g, ''))
    .pipe(wrap({ src: './template.tpl' }, {
      exports: 'exports.VersionableList = VersionableList;\n' +
               'exports.VersionableMap = VersionableMap;'
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
      './lib/utils.js',
      './lib/versionable-collection.js',
      './lib/versionable-list.js',
      './lib/versionable-collections.angular.js'
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
