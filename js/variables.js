'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var mainElement = document.querySelector('main');
  var userMapElement = document.querySelector('.map');
  var pinMainElement = document.querySelector('.map__pin--main');

  window.variables = {
    MIN_Y: 130,
    MAX_Y: 630,
    MAX_ROOM: 100,
    TYPES_OPTIONS: {
      palace: {
        name: 'Дворец',
        minPrice: '10000'
      },
      flat: {
        name: 'Квартира',
        minPrice: '1000'
      },
      bungalo: {
        name: 'Бунгало',
        minPrice: '0'
      },
      house: {
        name: 'Дом',
        minPrice: '5000'
      }
    },
    FILE_TYPES: FILE_TYPES,
    userMapElement: userMapElement,
    pinMainElement: pinMainElement,
    mainElement: mainElement
  };

})();
