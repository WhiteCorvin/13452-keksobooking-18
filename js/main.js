'use strict';

(function () {

  var NUMBER_OF_ADV = 8;

  var showMapDialog = function () {
    window.variables.userMapElement.classList.remove('map--faded');
  };

  var onMainPinEnterPress = function (evt) {
    window.util.onElementEnterPress(evt, doActiveMode);
  };

  var doActiveMode = function () {
    window.form.doActiveForm();

    showMapDialog();
    var advArray = window.generateRandomAdv(NUMBER_OF_ADV);
    window.renderPins(advArray);

    window.variables.pinMainElement.removeEventListener('mousedown', doActiveMode);
    window.variables.pinMainElement.removeEventListener('keydown', onMainPinEnterPress);

    window.initMainPin();
  };

  var addClickMainPinListener = function () {
    window.variables.pinMainElement.addEventListener('mousedown', doActiveMode);
    window.variables.pinMainElement.addEventListener('keydown', onMainPinEnterPress);
  };

  var init = function () {
    window.form.initializationForm();
    addClickMainPinListener();
  };

  init();

})();

