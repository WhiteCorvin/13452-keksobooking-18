'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var getValueByKey = function (names, value) {

    for (var i in names) {
      if (i === value) {
        return names[i];
      }
    }
    return '';
  };

  var getLastDigit = function (number) {
    var numAsStr = number + '';
    var numbers = numAsStr.split('');
    return Number.parseInt(numbers[numbers.length - 1], 10);
  };

  var onElementEnterPress = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var onElementEscPress = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var doChangeDisabledElement = function (element, isDisabled) {
    element.disabled = isDisabled;
  };

  window.util = {
    getValueByKey: getValueByKey,
    getLastDigit: getLastDigit,
    onElementEnterPress: onElementEnterPress,
    onElementEscPress: onElementEscPress,
    doChangeDisabledElement: doChangeDisabledElement
  };

})();
