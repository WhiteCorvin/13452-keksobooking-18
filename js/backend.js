'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking/';
  var STATUS_SUCCESS = 200;

  var connect = function (onLoad, onError, data) {
    var url = LOAD_URL;
    var requestType = 'GET';

    if (data) {
      requestType = 'POST';
      url = SAVE_URL;
    }

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError(requestType, 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(requestType, 'Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError(requestType, 'Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(requestType, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    connect(onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    connect(onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
