/* global it, describe, expect, beforeEach */
var VersionableList =
  require('../dist/versionable-collections').VersionableList;

describe('VersionableList', function () {
  'use strict';

  it('should be defined', function () {
    expect(VersionableList).toBeDefined();
  });

  it('should define a single enumerable property', function () {
    var props = new VersionableList();
    expect(Object.keys(props)).toEqual(['_version']);
  });

  describe('mutation methods', function () {

    var list;

    beforeEach(function () {
      list = new VersionableList();
    });

    it('should define push method', function () {
      var oldVersion = list._version;
      expect(list.push).toBeDefined();
      list.push(1);
      expect(list._version).not.toBe(oldVersion);
      expect(list.length).toBe(1);
      expect(list.toValue()).toEqual([1]);
    });

    it('should define pop method', function () {
      list.push(1);
      var oldVersion = list._version;
      expect(list.pop).toBeDefined();
      list.pop();
      expect(list.toValue()).toEqual([]);
      expect(list.length).toBe(0);
      expect(list._version).not.toBe(oldVersion);
    });

    it('should define shift method', function () {
      list.push(1);
      var oldVersion = list._version;
      expect(list.shift).toBeDefined();
      list.shift();
      expect(list.toValue()).toEqual([]);
      expect(list.length).toBe(0);
      expect(list._version).not.toBe(oldVersion);
    });

    it('should define unshift method', function () {
      var oldVersion = list._version;
      expect(list.unshift).toBeDefined();
      list.unshift(1);
      expect(list._version).not.toBe(oldVersion);
      expect(list.length).toBe(1);
      expect(list.toValue()).toEqual([1]);
    });

    it('should defibe a splice method', function () {
      list.push(1, 2, 3, 4);
      expect(list.length).toBe(4);
      list.splice(1, 1);
      expect(list.length).toBe(3);
      expect(list.toValue()).toEqual([1, 3, 4]);
    });

    it('should define forEach method', function () {
      list.push({});
      list.push({});
      var oldVersion = list._version;
      list.forEach(function (current) {
        current.foo = 'bar';
      });
      expect(oldVersion).not.toBe(list._version);
      expect(list.toValue()[0].foo).toBe('bar');
      expect(list.toValue()[1].foo).toBe('bar');
    });
  });

  describe('high-order functions', function () {
    it('should define a map method', function () {
      var list = new VersionableList([1, 2, 3, 4]);
      expect(list.map).toBeDefined();
      var newList = list.map(function (current) {
        return current + 1;
      });
      expect(newList.toValue()).toEqual([2, 3, 4, 5]);
    });

    it('should define a filter method', function () {
      var list = new VersionableList([1, 2, 3, 4]);
      expect(list.filter).toBeDefined();
      var newList = list.filter(function (current) {
        return !!(current % 2);
      });
      expect(newList.toValue()).toEqual([1, 3]);
    });

    it('should define reduce method', function () {
      var list = new VersionableList([1, 2, 3]);
      expect(list.reduce(function (o, c) {
        return o + c;
      }, 0)).toBe(6);
    });

    it('should define every method', function () {
      var list = new VersionableList([1, 2, 3]);
      expect(list.every(function (c) {
        return typeof c === 'number';
      })).toBeTruthy();
    });

    it('should define reduceRight method', function () {
      var list = new VersionableList([1, 2]);
      expect(list.reduceRight(function (p, c) {
        return c / p;
      }, 1)).toBe(0.5);
    });
  });

  describe('other methods', function () {
    it('should define concat method', function () {
      var list = new VersionableList([1, 2]);
      expect(list.concat).toBeDefined();
      var otherList = new VersionableList([3, 4]);
      var result = list.concat(otherList);
      expect(result instanceof VersionableList).toBeTruthy();
      expect(result.length).toBe(4);
      expect(result.toValue()).toEqual([1, 2, 3, 4]);
    });

    it('should define indexOf method', function () {
      var list = new VersionableList([1, 2, 2, 3]);
      expect(list.indexOf).toBeDefined();
      expect(list.indexOf(1)).toBe(0);
      expect(list.indexOf(2)).toBe(1);
      expect(list.indexOf(3)).toBe(3);
      expect(list.indexOf(4)).toBe(-1);
      expect(list.indexOf(0)).toBe(-1);
    });

    it('should define lastIndexOf method', function () {
      var list = new VersionableList([1, 2, 2, 3]);
      expect(list.lastIndexOf).toBeDefined();
      expect(list.lastIndexOf(1)).toBe(0);
      expect(list.lastIndexOf(2)).toBe(2);
      expect(list.lastIndexOf(3)).toBe(3);
      expect(list.lastIndexOf(4)).toBe(-1);
      expect(list.lastIndexOf(0)).toBe(-1);
    });

    it('should define a sort method', function () {
      var list = new VersionableList([2, 11, 3]);
      expect(list.sort).toBeDefined();
      var lexSort = list.sort();
      expect(lexSort.toValue()).toEqual([11, 2, 3]);
      var sorted = list.sort(function (a, b) {
        return a - b;
      });
      expect(sorted.toValue()).toEqual([2, 3, 11]);
    });
  });
});
