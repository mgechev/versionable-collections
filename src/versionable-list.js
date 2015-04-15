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
  defineProperty(this, 'version', {
    get: function () {
      return version;
    },
    set: function (val) {
      version = val;
    },
    enumerable: true
  });
  defineProperty(this, 'data', {
    value: arr || [],
    enumerable: false
  });
  defineProperty(this, 'length', {
    enumerable: false,
    get: function () {
      return this.data.length;
    }
  });
}

defineMethod(VersionableList.prototype, 'toValue', function () {
  return this.data.slice();
});

defineMethod(VersionableList.prototype, 'updateVersion', function () {
  this.version += 1;
});

'push pop shift unshift'.split(' ')
  .forEach(function (prop) {
    defineMethod(VersionableList.prototype, prop, function () {
      this.data[prop].apply(this.data, arguments);
      this.updateVersion();
    });
  });

var exports = (typeof window !== 'undefined') ? window : module.exports;

exports.VersionableList = VersionableList;
