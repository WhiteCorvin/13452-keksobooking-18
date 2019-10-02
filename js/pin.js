'use strict';

(function () {

  var mapPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (advData) {
    var pinElement = mapPinsTemplate.cloneNode(true);

    pinElement.style.left = (advData.location.x + pinElement.clientWidth / 2) + 'px';
    pinElement.style.top = (advData.location.y + pinElement.clientHeight) + 'px';
    pinElement.querySelector('img').src = advData.author.avatar;
    pinElement.querySelector('img').alt = advData.offer.title;

    return pinElement;
  };

  window.renderPin = renderPin;

})();
