'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomData = function (arr) {
    var position = getRandomInt(arr.length);
    return arr[position];
  };

  var getRandomArray = function (arr) {
    var randomArr = [];
    var arrayLength = getRandomIntInclusive(1, arr.length);

    for (var i = 0; i < arrayLength; i++) {
      randomArr.push(arr[i]);
    }

    return randomArr;
  };

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

    return Number.parseInt(numbers[number.length - 1], 10);
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

  window.util = {
    getRandomInt: getRandomInt,
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomData: getRandomData,
    getRandomArray: getRandomArray,
    getValueByKey: getValueByKey,
    getLastDigit: getLastDigit,
    onElementEnterPress: onElementEnterPress,
    onElementEscPress: onElementEscPress
  };

})();
