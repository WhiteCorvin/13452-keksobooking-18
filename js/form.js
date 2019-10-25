'use strict';

(function () {

  var activeMode = false;

  var formElement = document.querySelector('.ad-form');
  var formHeaderFieldsetElement = formElement.querySelector('.ad-form-header');
  var formFieldsetElements = formElement.querySelectorAll('.ad-form__element');

  var formAddressInputElement = formElement.querySelector('[name="address"]');

  var roomSelectElement = formElement.querySelector('[name="rooms"]');
  var roomOptionElements = roomSelectElement.querySelectorAll('option');
  var capacityOptionElements = formElement.querySelector('[name="capacity"]').querySelectorAll('option');

  var typeSelectElement = formElement.querySelector('[name="type"]');
  var typeOptionElements = typeSelectElement.querySelectorAll('option');
  var priceInputElement = formElement.querySelector('[name="price"]');

  var addressInputElement = formElement.querySelector('[name="address"]');

  var timeInSelectElement = formElement.querySelector('[name="timein"]');
  var timeInOptionElements = timeInSelectElement.querySelectorAll('option');

  var timeOutSelectElement = formElement.querySelector('[name="timeout"]');
  var timeOutOptionElements = timeOutSelectElement.querySelectorAll('option');

  var formTitleInputElement = formElement.querySelector('[name="title"]');
  var formDescriptionInputElement = formElement.querySelector('[name="description"]');

  var resetFormElement = formElement.querySelector('.ad-form__reset');

  var getSelectedElementValue = function (arr) {

    var selectedElement = [].find.call(arr, function (element) {
      return element.selected;
    });

    return selectedElement.value;
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
        window.util.doChangeDisabledElement(capacityOptionElements[i], false);
        capacityOptionElements[i].selected = true;
      } else if (capacityValue === 0 && roomValue === window.variables.MAX_ROOM) {
        window.util.doChangeDisabledElement(capacityOptionElements[i], false);
        capacityOptionElements[i].selected = true;
      } else {
        window.util.doChangeDisabledElement(capacityOptionElements[i], true);
      }
    }

  };

  var onTypeSelectElementChange = function () {
    var selectedType = getSelectedElementValue(typeOptionElements);
    var typeValue = window.util.getValueByKey(window.variables.TYPES_OPTIONS, selectedType).minPrice;
    priceInputElement.min = typeValue;
    priceInputElement.placeholder = typeValue;
  };

  var syncTime = function (clickedTime, changedTime) {
    var selectedValue = getSelectedElementValue(clickedTime);

    [].find.call(changedTime, function (element) {

      if (selectedValue === element.value) {
        element.selected = true;
        return true;
      } else {
        return false;
      }

    });
  };

  var onTimeOutSelectElementChange = function () {
    syncTime(timeOutOptionElements, timeInOptionElements);
  };

  var onTimeInSelectElementChange = function () {
    syncTime(timeInOptionElements, timeOutOptionElements);
  };

  var doInactiveForm = function () {
    window.util.doChangeDisabledElement(formHeaderFieldsetElement, true);

    formFieldsetElements.forEach(function (element) {
      window.util.doChangeDisabledElement(element, true);
    });

  };

  var doDisabledFormElements = function () {
    formElement.classList.add('ad-form--disabled');
  };

  var doResetForm = function () {
    var formAllOptionElements = formElement.querySelectorAll('option');
    var formAllCheckboxElements = formElement.querySelectorAll('[type="checkbox"]');

    formAllOptionElements.forEach(function (element) {
      element.selected = element.defaultSelected;
    });

    formAllCheckboxElements.forEach(function (element) {
      element.checked = element.defaultChecked;
    });

    window.resetAvatarPreviewImage();
    window.deleteImageElements();

    formTitleInputElement.value = '';
    priceInputElement.value = '';
    formDescriptionInputElement.value = '';
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

  var onResetFormElementClick = function (evt) {
    evt.preventDefault();
    doResetForm();
    doValidationForm();
    fillAddressInput();
  };

  var initializationForm = function () {
    doInactiveForm(formFieldsetElements);
    doValidationForm();
    fillAddressInput();
    resetFormElement.addEventListener('click', onResetFormElementClick);
  };

  var doActiveForm = function () {
    activeMode = true;
    fillAddressInput();
    window.util.doChangeDisabledElement(formHeaderFieldsetElement, false);

    for (var i = 0; i < formFieldsetElements.length; i++) {
      window.util.doChangeDisabledElement(formFieldsetElements[i], false);
    }

    formElement.classList.remove('ad-form--disabled');
  };

  var submitDataForm = function () {
    window.backend.save(new FormData(formElement), onSubmitSuccess, window.errorMessage);
  };
  var onSubmitSuccess = function () {
    window.successMessage();
    window.main.doDeactiveMode();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    submitDataForm();
  };

  var doSubmitFormListener = function () {
    formElement.addEventListener('submit', onFormSubmit);
  };

  window.form = {
    initializationForm: initializationForm,
    doActiveForm: doActiveForm,
    doResetForm: doResetForm,
    doDisabledFormElements: doDisabledFormElements,
    fillAddressInput: fillAddressInput,
    doSubmitFormListener: doSubmitFormListener,
    submitDataForm: submitDataForm
  };

})();
