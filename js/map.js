'use strict';

(function () {

  var VALUE_OF_PINS = 5;
  var NOTICE_CLASS = 'map__pin--notice';

  var pinListElement = document.querySelector('.map__pins');
  var filtersContainerElement = document.querySelector('.map__filters-container');

  var closePopup = function () {
    var popupElement = document.querySelector('.map__card');
    var activePinElement = document.querySelector('.map__pin--active');

    if (popupElement) {
      popupElement.remove();
      activePinElement.classList.remove('map__pin--active');
    }

  };

  var addPinClickListener = function (element, data) {
    element.addEventListener('click', function () {
      closePopup();
      addCard(data);
      element.classList.add('map__pin--active');

      var popupCloseElement = document.querySelector('.popup__close');

      popupCloseElement.addEventListener('click', function () {
        closePopup();
        element.classList.remove('map__pin--active');
      });

      window.addEventListener('keydown', function (evt) {
        window.util.onElementEscPress(evt, closePopup);
      });

    });
  };

  var deleteRenderedPins = function () {
    var renderedPins = pinListElement.querySelectorAll('.' + NOTICE_CLASS);

    if (renderedPins) {
      renderedPins.forEach(function (element) {
        element.remove();
      });
    }

  };

  var renderPins = function (advList) {
    var fragment = document.createDocumentFragment();
    closePopup();
    deleteRenderedPins();
    var valueOfPins = (advList.length >= VALUE_OF_PINS) ? VALUE_OF_PINS : advList.length;

    for (var i = 0; i <= (valueOfPins - 1); i++) {
      var pin = window.renderPin(advList[i]);

      pin.classList.add(NOTICE_CLASS);

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
