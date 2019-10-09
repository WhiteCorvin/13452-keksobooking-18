'use strict';

(function () {

  var pinListElement = document.querySelector('.map__pins');
  var filtersContainerElement = document.querySelector('.map__filters-container');

  var closePopup = function () {
    var popupElement = document.querySelector('.map__card');

    if (popupElement) {
      popupElement.remove();
    }

  };

  var addPinClickListener = function (element, data) {
    element.addEventListener('click', function () {
      var popupElement = document.querySelector('.map__card');
      if (popupElement) {
        popupElement.remove();
      }
      addCard(data);

      popupElement = document.querySelector('.map__card');
      var popupCloseElement = popupElement.querySelector('.popup__close');

      popupCloseElement.addEventListener('click', function () {
        closePopup();
      });

      window.addEventListener('keydown', function (evt) {
        window.util.onElementEscPress(evt, closePopup);
      });

    });
  };

  var renderPins = function (advList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advList.length; i++) {
      var pin = window.renderPin(advList[i]);

      addPinClickListener(pin, advList[i]);

      fragment.appendChild(pin);
    }

    pinListElement.appendChild(fragment);
  };

  var deletePins = function () {
    var pins = pinListElement.querySelectorAll('[type="button"]');

    for (var i = 0; i < pins.length; i++) {
      pins[i].parentNode.removeChild(pins[i]);
    }

  };

  var addCard = function (advItem) {
    var adv = window.renderCard(advItem);
    window.variables.userMapElement.insertBefore(adv, filtersContainerElement);
  };

  window.map = {
    renderPins: renderPins,
    deletePins: deletePins,
    closePopup: closePopup
  };

})();
