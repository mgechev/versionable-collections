/* global it, describe, expect */
var VersionableMap =
  require('../dist/versionable-collections').VersionableMap;

describe('VersionableMap', function () {
  'use strict';

  it('should be defined as a function', function () {
    expect(typeof VersionableMap).toBe('function');
  });

  it('should has base "class" VersionableCollection', function () {
    var map = new VersionableMap();
    expect(map instanceof VersionableMap).toBeTruthy();
  });

  it('should has only a single key for its instances called _version',
    function () {
      var map = new VersionableMap();
      expect(Object.keys(map)).toEqual(['_version']);
    });
});
