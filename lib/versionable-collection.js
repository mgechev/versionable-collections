/* global defineProperty, defineMethod */
'use strict';

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
