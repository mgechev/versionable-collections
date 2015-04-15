'use strict';

function defineProperty(obj, name, descriptor) {
  Object.defineProperty(obj, name, descriptor);
}

function defineMethod(obj, name, method) {
  defineProperty(obj, name, {
    enumerable: false,
    value: method
  });
}

function VersionableList(arr) {
  var version = 0;
  defineProperty(this, '_version', {
    get: function () {
      return version;
    },
    set: function (val) {
      version = val;
    },
    enumerable: true
  });
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

defineMethod(VersionableList.prototype, '_updateVersion', function () {
  this._version += 1;
});

'push pop shift unshift'.split(' ')
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

var exports = (typeof window !== 'undefined') ? window : module.exports;

exports.VersionableList = VersionableList;
