/* global angular, VersionableList, VersionableMap */

'use strict';
angular.module('VersionableCollections', [])
  .factory('VersionableList', function () {
    return VersionableList;
  })
  .factory('VersionableMap', function () {
    return VersionableMap;
  });
