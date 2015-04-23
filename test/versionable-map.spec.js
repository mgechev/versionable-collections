/* global it, describe, expect, beforeEach */
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

  describe('methods', function () {
    var map;
    beforeEach(function () {
      map = new VersionableMap();
    });

    it('should define set method which changes the version', function () {
      var oldVersion = map._version;
      map.set('key', 'value');
      expect(oldVersion).not.toBe(map._version);
    });

    it('should define a get method which doesn\'t change the version',
      function () {
        map.set('foo', 'bar');
        var oldVersion = map._version;
        expect(map.get('foo')).toBe('bar');
        expect(map._version).toBe(oldVersion);
      });

    it('should define a remove method, which changes the' +
      'version, when the key is removed', function () {
        map.set('foo', 'bar');
        var oldVersion = map._version;
        map.remove('foo');
        expect(map._version).not.toBe(oldVersion);
      });

    it('should define a remove method, which does not' +
       'change the version, when the key doesn\'t exists', function () {
        var oldVersion = map._version;
        map.remove('foo');
        expect(map._version).toBe(oldVersion);
      });

    it('should define method keys which returns all keys of the collection',
      function () {
        map.set('key0', 1);
        map.set('key1', 1);
        var keys = map.keys();
        expect(keys.indexOf('key0') >= 0).toBeTruthy();
        expect(keys.indexOf('key1') >= 0).toBeTruthy();
      });
  });
});
