'use strict';

(function () {

  var messageTemplate = document.querySelector('#error').content.querySelector('.error');

  var addErrorCloseListener = function (requestType) {
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
      if (requestType === 'GET') {
        window.main.loadDataPin();
      } else {
        window.form.submitDataForm();
      }

      closeError();
    };

    var onErrorCloseElementClick = function () {
      closeError();
    };

    errorMessageCloseElement.addEventListener('click', onErrorCloseElementClick);
    errorMessageCloseElement.addEventListener('keydown', function (evt) {
      window.util.onElementEnterPress(evt, closeError);
    });
    window.addEventListener('keydown', onErrorCloseEscPress);

    errorMessageButtonElement.addEventListener('click', function () {
      doReconnect();
    });
    errorMessageButtonElement.addEventListener('keydown', function (evt) {
      window.util.onElementEnterPress(evt, doReconnect);
    });
  };

  var errorMessage = function (requestType, message) {
    var errorElement = messageTemplate.cloneNode(true);

    errorElement.querySelector('.error__message').textContent = message;

    window.variables.mainElement.prepend(errorElement);
    addErrorCloseListener(requestType);
  };

  window.errorMessage = errorMessage;
})();
