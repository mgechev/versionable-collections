/* global defineProperty, defineMethod, VersionableCollection */
'use strict';

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
