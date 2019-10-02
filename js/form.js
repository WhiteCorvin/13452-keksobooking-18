'use strict';

(function () {

  var activeMode = false;

  var formElement = document.querySelector('.ad-form');
  var formHeaderFieldsetElement = document.querySelector('.ad-form-header');
  var formFieldsetElements = document.querySelectorAll('.ad-form__element');

  var formAddressInputElement = document.querySelector('[name="address"]');

  var roomSelectElement = document.querySelector('[name="rooms"]');
  var roomOptionElements = roomSelectElement.querySelectorAll('option');
  var capacityOptionElements = document.querySelector('[name="capacity"]').querySelectorAll('option');

  var typeSelectElement = document.querySelector('[name="type"]');
  var typeOptionElements = typeSelectElement.querySelectorAll('option');
  var priceInputElement = document.querySelector('[name="price"]');

  var addressInputElement = document.querySelector('[name="address"]');

  var timeInSelectElement = document.querySelector('[name="timein"]');
  var timeInOptionElements = timeInSelectElement.querySelectorAll('option');

  var timeOutSelectElement = document.querySelector('[name="timeout"]');
  var timeOutOptionElements = timeOutSelectElement.querySelectorAll('option');

  var getSelectedElementValue = function (arr) {

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].selected) {
        return arr[i].value;
      }
    }

    return '';
  };

  var fillAddressInput = function () {
    var top = window.variables.pinMainElement.offsetTop;
    var leftWithWidth = Math.round(window.variables.pinMainElement.offsetLeft + window.variables.pinMainElement.offsetWidth / 2);
    var topWithHeight = activeMode ? (top + window.variables.pinMainElement.offsetHeight) : (top + window.variables.pinMainElement.offsetHeight / 2);

    formAddressInputElement.value = leftWithWidth + ', ' + topWithHeight;
    formAddressInputElement.nodeValue = leftWithWidth + ', ' + topWithHeight;
  };

  var onRoomSelectElementChange = function () {
    var roomValue = Number(getSelectedElementValue(roomOptionElements));

    for (var i = 0; i < capacityOptionElements.length; i++) {
      var capacityValue = Number(capacityOptionElements[i].value);

      if (roomValue >= capacityValue && roomValue !== window.variables.MAX_ROOM && capacityValue !== 0) {
        doChangeDisabledElement(capacityOptionElements[i], false);
        capacityOptionElements[i].selected = true;
      } else if (capacityValue === 0 && roomValue === window.variables.MAX_ROOM) {
        doChangeDisabledElement(capacityOptionElements[i], false);
        capacityOptionElements[i].selected = true;
      } else {
        doChangeDisabledElement(capacityOptionElements[i], true);
      }
    }

  };

  var doChangeDisabledElement = function (element, isDisabled) {
    element.disabled = isDisabled;
  };

  var onTypeSelectElementChange = function () {
    var selectedType = getSelectedElementValue(typeOptionElements);
    var typeValue = window.util.getValueByKey(window.variables.TYPES_OPTIONS, selectedType).minPrice;
    priceInputElement.min = typeValue;
    priceInputElement.placeholder = typeValue;
  };

  var syncTime = function (clickedTime, changedTime) {
    var selectedValue = getSelectedElementValue(clickedTime);

    for (var i = 0; i < changedTime.length; i++) {
      if (selectedValue === changedTime[i].value) {
        changedTime[i].selected = true;
        return;
      }
    }

  };

  var onTimeOutSelectElementChange = function () {
    syncTime(timeOutOptionElements, timeInOptionElements);
  };

  var onTimeInSelectElementChange = function () {
    syncTime(timeInOptionElements, timeOutOptionElements);
  };

  var doInactiveForm = function () {
    doChangeDisabledElement(formHeaderFieldsetElement, true);

    for (var i = 0; i < formFieldsetElements.length; i++) {
      doChangeDisabledElement(formFieldsetElements[i], true);
    }

  };

  var doValidationForm = function () {
    onRoomSelectElementChange();
    onTypeSelectElementChange();

    addressInputElement.readOnly = true;

    roomSelectElement.addEventListener('change', onRoomSelectElementChange);
    typeSelectElement.addEventListener('change', onTypeSelectElementChange);

    timeOutSelectElement.addEventListener('change', onTimeOutSelectElementChange);
    timeInSelectElement.addEventListener('change', onTimeInSelectElementChange);
  };

  var initializationForm = function () {
    doInactiveForm(formFieldsetElements);
    doValidationForm();
    fillAddressInput();
  };

  var doActiveForm = function () {
    activeMode = true;
    fillAddressInput();
    doChangeDisabledElement(formHeaderFieldsetElement, false);

    for (var i = 0; i < formFieldsetElements.length; i++) {
      doChangeDisabledElement(formFieldsetElements[i], false);
    }

    formElement.classList.remove('ad-form--disabled');
  };

  window.form = {
    initializationForm: initializationForm,
    doActiveForm: doActiveForm,
    fillAddressInput: fillAddressInput
  };

})();
