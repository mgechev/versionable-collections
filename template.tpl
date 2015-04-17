(function (exports) {
  'use strict';
  <%= data.contents %>
  <%= data.exports %>
}(typeof window === 'undefined' ? module.exports : window));
