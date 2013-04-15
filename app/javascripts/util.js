window.Util = {
  ajax: function ajax (method, path, payload, cb) {
    var xhr = null;

    if (typeof cb !== 'function') {
      throw new Error('ajaxGet needs a callback function');
    }

    xhr = new XMLHttpRequest();
    xhr.open(method, path);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Content-length', payload.length);
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
    console.log(payload + '| payload');
    xhr.send(JSON.stringify(payload));
  },
  ajaxGetJSON: function ajaxGetJSON (path, cb) {
    this.ajax('GET', path, null, cb);
  },
  logError: function logError (msg) {
    document.getElementById('error_msgs')
            .appendChild(document.createTextNode(msg));
  },
  ajaxPostJSON: function ajaxPostJSON (path, payload, cb) {
    this.ajax('POST', path, payload, cb);
  },
  getRecord: function getRecord (cb) {
    var request = navigator.mozApps.getSelf();
    request.onerror = function getSelfOnError () {
      cb(request.error.name, null);
    };
    request.onsuccess = function getSelfOnSuccess () {
      cb(null, request.result);
    };
  }
};
