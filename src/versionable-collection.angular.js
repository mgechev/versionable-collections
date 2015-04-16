/* global angular, VersionableList */

(function () {
  'use strict';
  angular.module('VersionableCollection', [])
    .factory('VersionableList', function () {
      return VersionableList;
    });
}());
