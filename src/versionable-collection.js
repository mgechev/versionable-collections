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

function VersionableArray(arr) {
  this._version = 0;
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

VersionableArray.prototype.toValue = function () {
  return this.data.slice();
};

'push pop shift unshift'.split(' ')
  .forEach(function (prop) {
    defineMethod(VersionableArray.prototype, prop, function () {
      this.data[prop].apply(this.data, arguments);
      this._version += 1;
    });
  });
