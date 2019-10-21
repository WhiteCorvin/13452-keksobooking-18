'use strict';

(function () {

  var messageTemplate = document.querySelector('#success').content.querySelector('.success');

  var onWindowClick = function () {
    var successElement = document.querySelector('.success');

    successElement.remove();

    window.removeEventListener('click', onWindowClick);
    window.removeEventListener('keydown', onKeydownSuccessElement);
  };

  var onKeydownSuccessElement = function (evt) {
    window.util.onElementEscPress(evt, onWindowClick);
  };

  var successMessage = function () {
    var successElement = messageTemplate.cloneNode(true);

    window.variables.mainElement.prepend(successElement);

    window.map.closePopup();

    window.addEventListener('click', onWindowClick);
    window.addEventListener('keydown', onKeydownSuccessElement);
  };

  window.successMessage = successMessage;

})();
