(function (exports) {
  'use strict';
  /* exported defineMethod */


function defineProperty(obj, name, descriptor) {
  Object.defineProperty(obj, name, descriptor);
}

function defineMethod(obj, name, method) {
  defineProperty(obj, name, {
    enumerable: false,
    value: method
  });
}

/* global defineProperty, defineMethod */


function VersionableCollection() {
  defineProperty(this, '_version', {
    value: 0,
    enumerable: true,
    writable: true
  });
}

defineMethod(VersionableCollection.prototype, '_updateVersion', function () {
  this._version += 1;
});

/* global defineProperty, defineMethod, VersionableCollection */


function VersionableList(arr) {
  VersionableCollection.call(this);
  defineProperty(this, '_data', {
    value: arr || [],
    enumerable: false
  });
  defineProperty(this, 'length', {
    enumerable: false,
    get: function () {
      return this._data.length;
    }
  });
}

VersionableList.prototype = Object.create(VersionableCollection.prototype);

// The direct access to the data property is not allowed
// we don't want the user to change the data without any updates
// of the collection's version.
/**
 * Gets the value of the list
 *
 * @public
 * @return {Array} The result array
 */
defineMethod(VersionableList.prototype, 'toValue', function () {
  return this._data.slice();
});

'push pop shift unshift splice'.split(' ')
  .forEach(function (prop) {
    defineMethod(VersionableList.prototype, prop, function () {
      this._data[prop].apply(this._data, arguments);
      this._updateVersion();
    });
  });

'map filter'.split(' ')
  .forEach(function (prop) {
    defineMethod(VersionableList.prototype, prop, function () {
      return new VersionableList(this._data[prop].apply(this._data, arguments));
    });
  });

'reduce every reduceRight'.split(' ')
  .forEach(function (prop) {
    defineMethod(VersionableList.prototype, prop, function () {
      return this._data[prop].apply(this._data, arguments);
    });
  });

defineMethod(VersionableList.prototype, 'forEach', function () {
  this._data.forEach.apply(this._data, arguments);
  this._updateVersion();
});

defineMethod(VersionableList.prototype, 'concat', function (otherList) {
  return new VersionableList(this._data.concat(otherList._data));
});

'indexOf lastIndexOf'.split(' ')
  .forEach(function (prop) {
    defineMethod(VersionableList.prototype, prop, function () {
      return this._data[prop].apply(this._data, arguments);
    });
  });

defineMethod(VersionableList.prototype, 'sort', function () {
  return new VersionableList(this._data.sort.apply(this._data, arguments));
});

/* global defineProperty, defineMethod, VersionableCollection */


function VersionableMap(data) {
  VersionableCollection.call(this);
  defineProperty(this, '_data', {
    value: data || {},
    enumerable: false
  });
}

VersionableMap.prototype = Object.create(VersionableCollection.prototype);

defineMethod(VersionableMap.prototype, 'set', function (key, value) {
  this._data[key] = value;
  this._updateVersion();
});

defineMethod(VersionableMap.prototype, 'get', function (key) {
  return this._data[key];
});

defineMethod(VersionableMap.prototype, 'remove', function (key) {
  var value = this._data[key];
  if (this._data[key] !== undefined) {
    delete this._data[key];
    this._updateVersion();
  }
  return value;
});

defineMethod(VersionableMap.prototype, 'keys', function () {
  return Object.keys(this._data);
});

/* global angular, VersionableList */


angular.module('VersionableCollection', [])
  .factory('VersionableList', function () {
    return VersionableList;
  });

  
}(typeof window === 'undefined' ? module.exports : window));