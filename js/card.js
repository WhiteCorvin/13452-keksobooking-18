'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var getCapacityText = function (rooms, guests) {
    var text = rooms;
    var firstDigitRooms = window.util.getLastDigit(rooms);
    if (firstDigitRooms === 1) {
      text += ' комната';
    } else {
      text += (firstDigitRooms < 5 && firstDigitRooms !== 0) ? ' комнаты' : ' комнат';
    }
    text += ' для ' + guests + ' ';
    text += (guests === 1) ? 'гостя' : 'гостей';
    return text;
  };

  var fillFeaturesList = function (featuresElement, featuresData) {

    var itemFeaturesElement = featuresElement.querySelector('.popup__feature--wifi').cloneNode(true);
    itemFeaturesElement.classList.remove('popup__feature--wifi');
    featuresElement.innerHTML = '';

    for (var i = 0; i < featuresData.length; i++) {
      var elem = itemFeaturesElement.cloneNode(true);
      elem.classList.add('popup__feature--' + featuresData[i]);
      featuresElement.appendChild(elem);
    }

  };

  var fillPhotosList = function (photosELement, photosData) {
    var photoELement = photosELement.querySelector('.popup__photo').cloneNode(true);
    photosELement.innerHTML = '';

    for (var i = 0; i < photosData.length; i++) {
      var elem = photoELement.cloneNode(true);
      elem.src = photosData[i];
      photosELement.appendChild(elem);
    }
  };

  var renderCard = function (adv) {
    var cardElement = cardTemplate.cloneNode(true);
    var name = adv.offer.type;
    var listFeaturesElement = cardElement.querySelector('.popup__features');
    var listFeaturesData = adv.offer.features;
    var listPhotosElement = cardElement.querySelector('.popup__photos');
    var listPhotosData = adv.offer.photos;

    cardElement.querySelector('.popup__title').textContent = adv.offer.title;
    cardElement.querySelector('.popup__text--price').firstChild.nodeValue = adv.offer.price + ' ₽';
    cardElement.querySelector('.popup__type').textContent = window.util.getValueByKey(window.variables.TYPES_OPTIONS, name).name;
    cardElement.querySelector('.popup__text--capacity').textContent = getCapacityText(adv.offer.rooms, adv.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = adv.offer.description;
    cardElement.querySelector('.popup__avatar').src = adv.author.avatar;

    fillFeaturesList(listFeaturesElement, listFeaturesData);
    fillPhotosList(listPhotosElement, listPhotosData);

    return cardElement;
  };

  window.renderCard = renderCard;

})();
