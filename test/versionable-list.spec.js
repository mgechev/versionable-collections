/* global it, describe, expect, beforeEach */
var VersionableList =
  require('../src/versionable-list').VersionableList;

describe('VersionableList', function () {
  'use strict';

  it('should be defined', function () {
    expect(VersionableList).toBeDefined();
  });

  it('should define a single enumerable property', function () {
    var props = new VersionableList();
    expect(Object.keys(props)).toEqual(['version']);
  });

  describe('mutation methods', function () {

    var list;

    beforeEach(function () {
      list = new VersionableList();
    });

    it('should define push method', function () {
      var oldVersion = list.version;
      expect(list.push).toBeDefined();
      list.push(1);
      expect(list.version).not.toBe(oldVersion);
      expect(list.length).toBe(1);
      expect(list.toValue()).toEqual([1]);
    });

    it('should define pop method', function () {
      list.push(1);
      var oldVersion = list.version;
      expect(list.pop).toBeDefined();
      list.pop();
      expect(list.toValue()).toEqual([]);
      expect(list.length).toBe(0);
      expect(list.version).not.toBe(oldVersion);
    });

    it('should define shift method', function () {
      list.push(1);
      var oldVersion = list.version;
      expect(list.shift).toBeDefined();
      list.shift();
      expect(list.toValue()).toEqual([]);
      expect(list.length).toBe(0);
      expect(list.version).not.toBe(oldVersion);
    });

    it('should unshift method', function () {
      var oldVersion = list.version;
      expect(list.unshift).toBeDefined();
      list.unshift(1);
      expect(list.version).not.toBe(oldVersion);
      expect(list.length).toBe(1);
      expect(list.toValue()).toEqual([1]);
    });
  });
});
