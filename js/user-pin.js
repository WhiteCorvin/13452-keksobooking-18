'use strict';

(function () {

  var userMapBorders = document.querySelector('.map__overlay');

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

        if (coords.y < userMapBorders.clientLeft || coords.y > (userMapBorders.clientWidth - window.variables.pinMainElement.clientWidth)) {
          return;
        } else if (coords.x < userMapBorders.clientTop || coords.x > (userMapBorders.clientHeight - window.variables.pinMainElement.clientHeight)) {
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

  var initMainPin = function () {
    addMoveMainPinElementListener();
  };

  window.initMainPin = initMainPin;

})();
