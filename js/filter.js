'use strict';

(function () {

  var loadedNotice = [];
  var typeNotice;

  var filtersElement = document.querySelector('.map__filters');
  var filtersSelectElements = filtersElement.querySelectorAll('.map__filter');
  var filtersFieldsetElement = filtersElement.querySelector('.map__features');
  var filterByTypeElement = filtersElement.querySelector('[name="housing-type"]');

  var blockFilter = function () {
    filtersSelectElements.forEach(function (element) {
      window.util.doChangeDisabledElement(element, true);
    });

    window.util.doChangeDisabledElement(filtersFieldsetElement, true);
  };

  var onTypeChange = window.debounce(function () {
    filterSortByType();
  });

  var unBlockFilter = function (notice) {
    loadedNotice = notice;

    filtersSelectElements.forEach(function (element) {
      window.util.doChangeDisabledElement(element, false);
    });

    window.util.doChangeDisabledElement(filtersFieldsetElement, false);

    filterByTypeElement.addEventListener('change', function () {
      typeNotice = filterByTypeElement.value;
      onTypeChange();
    });
  };

  var getRank = function (notice) {
    var rank = 0;

    if (notice.offer.type === typeNotice) {
      rank += 1;
    }

    return rank;
  };

  var filterSortByType = function () {
    window.map.renderPins(loadedNotice.sort(function (left, right) {
      return getRank(right) - getRank(left);
    }));
  };

  window.filter = {
    block: blockFilter,
    unBlock: unBlockFilter
  };

})();
