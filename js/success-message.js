'use strict';

(function () {

  var messageTemplate = document.querySelector('#success').content.querySelector('.success');

  var closeSuccessElement = function () {
    var successElement = document.querySelector('.success');

    successElement.remove();

    window.removeEventListener('click', closeSuccessElement);
    window.removeEventListener('keydown', onKeydownSuccessElement);
  };

  var onKeydownSuccessElement = function (evt) {
    window.util.onElementEscPress(evt, closeSuccessElement);
  };

  var successMessage = function () {
    var successElement = messageTemplate.cloneNode(true);

    window.variables.mainElement.prepend(successElement);

    window.addEventListener('click', closeSuccessElement);
    window.addEventListener('keydown', onKeydownSuccessElement);
  };

  window.successMessage = successMessage;

})();
