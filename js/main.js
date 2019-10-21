'use strict';

(function () {

  var FADED_CLASS = 'map--faded';

  var showMapDialog = function () {
    window.variables.userMapElement.classList.remove(FADED_CLASS);
  };

  var hideMapDialog = function () {
    window.variables.userMapElement.classList.add(FADED_CLASS);
  };

  var onMainPinEnterPress = function (evt) {
    window.util.onElementEnterPress(evt, onPinMainElementMousedown);
  };

  var onLoadSuccess = function (data) {
    window.filter.unBlock(data);
    window.map.renderPins(data);
  };

  var loadDataPin = function () {
    window.backend.load(onLoadSuccess, window.errorMessage);
  };

  var onPinMainElementMousedown = function () {
    window.form.doActiveForm();
    window.form.doSubmitFormListener();

    showMapDialog();
    loadDataPin();

    window.variables.pinMainElement.removeEventListener('mousedown', onPinMainElementMousedown);
    window.variables.pinMainElement.removeEventListener('keydown', onMainPinEnterPress);

    window.mainPin.init();
  };

  var doDeactiveMode = function () {
    window.mainPin.reset();
    window.map.deletePins();
    window.form.doResetForm();
    window.form.doDisabledFormElements();
    hideMapDialog();
    init();
  };

  var addClickMainPinListener = function () {
    window.variables.pinMainElement.addEventListener('mousedown', onPinMainElementMousedown);
    window.variables.pinMainElement.addEventListener('keydown', onMainPinEnterPress);
  };

  var init = function () {
    window.form.initializationForm();
    window.filter.block();
    addClickMainPinListener();
  };

  init();

  window.main = {
    loadDataPin: loadDataPin,
    doDeactiveMode: doDeactiveMode
  };


})();

