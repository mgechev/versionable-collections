/* global angular, VersionableList */

(function () {
  'use strict';
  var module = angular.module('VersionableCollection', []);

  module.factory('VersionableList', function () {
    return VersionableList;
  });
}());
