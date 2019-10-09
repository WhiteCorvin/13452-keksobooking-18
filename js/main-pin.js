'use strict';

(function () {

  var pinStartCoords = {
    x: window.variables.pinMainElement.style.top,
    y: window.variables.pinMainElement.style.left
  };

  var userMapBordersElement = document.querySelector('.map__overlay');

  var addMoveMainPinElementListener = function () {
    window.variables.pinMainElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var coords = {
          x: (window.variables.pinMainElement.offsetTop - shift.y),
          y: (window.variables.pinMainElement.offsetLeft - shift.x)
        };

        if (coords.y < userMapBordersElement.clientLeft || coords.y > (userMapBordersElement.clientWidth - window.variables.pinMainElement.clientWidth)) {
          return;
        } else if (coords.x < window.variables.MIN_Y - window.variables.pinMainElement.clientHeight || coords.x > (window.variables.MAX_Y - window.variables.pinMainElement.clientHeight)) {
          return;
        }

        window.variables.pinMainElement.style.top = coords.x + 'px';
        window.variables.pinMainElement.style.left = coords.y + 'px';
        window.form.fillAddressInput();

      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  };

  var resetMainPin = function () {
    window.variables.pinMainElement.style.top = pinStartCoords.x;
    window.variables.pinMainElement.style.left = pinStartCoords.y;
  };

  var initMainPin = function () {
    addMoveMainPinElementListener();
  };

  window.mainPin = {
    init: initMainPin,
    reset: resetMainPin
  };

})();
