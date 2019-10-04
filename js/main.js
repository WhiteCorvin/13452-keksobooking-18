'use strict';

(function () {

  var showMapDialog = function () {
    window.variables.userMapElement.classList.remove('map--faded');
  };

  var onMainPinEnterPress = function (evt) {
    window.util.onElementEnterPress(evt, doActiveMode);
  };

  var onLoadSuccess = function (data) {
    window.renderPins(data);
  };

  var doActiveMode = function () {
    window.form.doActiveForm();

    showMapDialog();
    window.connect(onLoadSuccess, window.errorMessage);

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

  window.onLoadSuccess = onLoadSuccess;

})();

