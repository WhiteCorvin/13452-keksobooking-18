'use strict';

(function () {

  var mainElement = document.querySelector('main');
  var messageTemplate = document.querySelector('#error').content.querySelector('.error');

  var addErrorCloseListener = function () {
    var errorMessageElement = document.querySelector('.error');
    var errorMessageCloseElement = errorMessageElement.querySelector('.error__close');
    var errorMessageButtonElement = errorMessageElement.querySelector('.error__button');

    var closeError = function () {
      errorMessageElement.remove();
      window.removeEventListener('keydown', onErrorCloseEscPress);
    };

    var onErrorCloseEscPress = function (evt) {
      window.util.onElementEscPress(evt, closeError);
    };

    var doReconnect = function () {
      window.connect(window.onLoadSuccess, window.errorMessage);
      closeError();
    };

    errorMessageCloseElement.addEventListener('click', closeError);
    errorMessageCloseElement.addEventListener('keydown', function (evt) {
      window.util.onElementEnterPress(evt, closeError);
    });
    window.addEventListener('keydown', onErrorCloseEscPress);

    errorMessageButtonElement.addEventListener('click', doReconnect);
    errorMessageButtonElement.addEventListener('keydown', function (evt) {
      window.util.onElementEnterPress(evt, doReconnect);
    });
  };

  var errorMessage = function (message) {
    var errorElement = messageTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').textContent = message;

    mainElement.prepend(errorElement);
    addErrorCloseListener();
  };

  window.errorMessage = errorMessage;
})();
