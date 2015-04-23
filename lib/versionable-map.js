/* global defineProperty, defineMethod, VersionableCollection */
'use strict';

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
