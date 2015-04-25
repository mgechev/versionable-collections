/* global angular, VersionableList, VersionableMap */

'use strict';
angular.module('VersionableCollection', [])
  .factory('VersionableList', function () {
    return VersionableList;
  })
  .factory('VersionableMap', function () {
    return VersionableMap;
  });
