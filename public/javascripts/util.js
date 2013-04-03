'use strict';

window.Util = {
  ajaxGetJSON: function ajaxGetJSON (path, cb) {
    var xhr = null;

    if (typeof cb !== 'function') {
      throw new Error('ajaxGet needs a callback function');
    }

    xhr = new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.onload = function onload (event) {
      var result = null;

      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            result = JSON.parse(xhr.responseText);
            cb(null, result);
          } catch (error) {
            cb(error, null);
          }
        } else {
          cb(new Error(xhr.statusText, null));
        }
      }
    };
    xhr.send();
  },
  logError: function logError (msg) {
    document.getElementById('error_msgs')
            .appendChild(document.createTextNode(msg));
  }
};