'use strict';

(function () {

  var PRICE_SCORE = {
    low: 10000,
    height: 50000
  };

  var ANY_TYPE = 'any';

  var loadedNotice = [];

  var filtersElement = document.querySelector('.map__filters');
  var filtersSelectElements = filtersElement.querySelectorAll('.map__filter');
  var filtersFieldsetElement = filtersElement.querySelector('.map__features');
  var filterByTypeElement = filtersElement.querySelector('[name="housing-type"]');
  var filterByPriceElement = filtersElement.querySelector('[name="housing-price"]');
  var filterByRoomsElement = filtersElement.querySelector('[name="housing-rooms"]');
  var filterByGuestsElement = filtersElement.querySelector('[name="housing-guests"]');
  var filterByFeaturesElements = filtersElement.querySelectorAll('[name="features"]');

  var typeValue;
  var priceValue;
  var roomsValue;
  var guestsValue;
  var activeFeatures = [];

  var typeTumbler = false;
  var roomsTumbler = false;
  var guestsTumbler = false;
  var priceTumbler = false;

  var blockFilter = function () {
    filtersSelectElements.forEach(function (element) {
      window.util.doChangeDisabledElement(element, true);
    });

    window.util.doChangeDisabledElement(filtersFieldsetElement, true);
  };

  var getPriceIntegerOnValue = function (price) {

    if (price < PRICE_SCORE.low) {
      return 'low';
    } else if (price <= PRICE_SCORE.height && price >= PRICE_SCORE.low) {
      return 'middle';
    } else if (price > PRICE_SCORE.height) {
      return 'hight';
    }
    return ANY_TYPE;
  };

  var getRank = function (notice) {
    var rank = 0;
    if (notice.offer.type === typeValue) {
      rank += 1;
    }
    if (notice.offer.rooms === parseInt(roomsValue, 10)) {
      rank += 1;
    }
    if (notice.offer.guests === parseInt(guestsValue, 10)) {
      rank += 1;
    }
    if (getPriceIntegerOnValue(notice.offer.price) === priceValue) {
      rank += 1;
    }
    activeFeatures.forEach(function (element) {
      notice.offer.features.forEach(function (feature) {
        if (element === feature) {
          rank += 1;
        }
      });
    });
    return rank;
  };

  var onTypeChange = window.debounce(function (value) {
    typeTumbler = (value === ANY_TYPE) ? false : true;
    typeValue = value;
    updateNoticese();
  });

  var onPriceChange = window.debounce(function (value) {
    priceTumbler = (value === ANY_TYPE) ? false : true;
    priceValue = value;
    updateNoticese();
  });

  var onRoomsChange = window.debounce(function (value) {
    roomsTumbler = (value === ANY_TYPE) ? false : true;
    roomsValue = value;
    updateNoticese();
  });

  var onGuestsChange = window.debounce(function (value) {
    guestsTumbler = (value === ANY_TYPE) ? false : true;
    guestsValue = value;
    updateNoticese();
  });


  var addSectionElementListener = function (section, functionChange) {
    section.addEventListener('change', function () {
      functionChange(section.value);
    });
  };

  var unBlockFilter = function (notice) {
    loadedNotice = notice;

    filtersSelectElements.forEach(function (element) {
      window.util.doChangeDisabledElement(element, false);
    });

    window.util.doChangeDisabledElement(filtersFieldsetElement, false);

    addSectionElementListener(filterByTypeElement, onTypeChange);
    addSectionElementListener(filterByPriceElement, onPriceChange);
    addSectionElementListener(filterByRoomsElement, onRoomsChange);
    addSectionElementListener(filterByGuestsElement, onGuestsChange);

    filterByFeaturesElements.forEach(function (element) {
      element.addEventListener('change', function () {
        if (element.checked) {
          activeFeatures.push(element.value);
        } else {
          activeFeatures.forEach(function (feature, index) {
            if (element.value === feature) {
              activeFeatures.splice(index, 1);
            }
          });
        }
        updateNoticese();
      });
    });
  };

  var updateNoticese = function () {
    window.map.renderPins(loadedNotice.filter(function (element) {
      var summOfTumblers = typeTumbler + roomsTumbler + guestsTumbler + priceTumbler + activeFeatures.length;
      return getRank(element) === summOfTumblers;
    }));
  };

  window.filter = {
    block: blockFilter,
    unBlock: unBlockFilter
  };

})();
