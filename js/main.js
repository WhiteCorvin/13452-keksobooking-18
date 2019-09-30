'use strict';

var TITLES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Tincidunt id aliquet risus feugiat in ante metus dictum at',
  'Neque aliquam vestibulum morbi blandit cursus risus',
  'Amet porttitor eget dolor morbi non arcu risus quis',
  'Volutpat diam ut venenatis tellus in metus',
  'Tellus id interdum velit laoreet id',
  'Donec ac odio tempor orci dapibus ultrices in iaculis',
  'Mattis vulputate enim nulla aliquet porttitor lacus luctus'
];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet eget sit amet tellus cras adipiscing. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor.',
  'Senectus et netus et malesuada fames. Risus commodo viverra maecenas accumsan lacus vel. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Mi ipsum faucibus vitae aliquet nec ullamcorper. Morbi tincidunt ornare massa eget. Sit amet commodo nulla facilisi nullam vehicula ipsum a.',
  'Et netus et malesuada fames ac. Lectus nulla at volutpat diam ut. Viverra accumsan in nisl nisi scelerisque eu. Massa enim nec dui nunc mattis enim ut.',
  'Eu nisl nunc mi ipsum faucibus vitae. Id leo in vitae turpis. Ultrices dui sapien eget mi proin sed. Vel risus commodo viverra maecenas. Est placerat in egestas erat imperdiet sed euismod. Quis imperdiet massa tincidunt nunc pulvinar.',
  'Ante metus dictum at tempor commodo ullamcorper. Odio facilisis mauris sit amet massa vitae tortor. Platea dictumst quisque sagittis purus sit amet volutpat consequat. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Sed arcu non odio euismod lacinia at quis risus sed.'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var TYPES_OPTIONS = {
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
};

var NUMBER_OF_ADV = 8;
var MAX_MONEY = 1000000;
var MAX_ROOM = 100;
var MAX_GUEST = 10;
var MIN_Y = 130;
var MAX_Y = 630;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var activeMode = false;

var userMapElement = document.querySelector('.map');
var mapPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinListElement = document.querySelector('.map__pins');
var pinMainElement = document.querySelector('.map__pin--main');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filtersContainerElement = document.querySelector('.map__filters-container');

var formElement = document.querySelector('.ad-form');
var formHeaderFieldsetElement = document.querySelector('.ad-form-header');
var formFieldsetElements = document.querySelectorAll('.ad-form__element');

var formAddressInputElement = document.querySelector('[name="address"]');

var roomSelectElement = document.querySelector('[name="rooms"]');
var roomOptionElements = roomSelectElement.querySelectorAll('option');
var capacityOptionElements = document.querySelector('[name="capacity"]').querySelectorAll('option');

var typeSelectElement = document.querySelector('[name="type"]');
var typeOptionElements = typeSelectElement.querySelectorAll('option');
var priceInputElement = document.querySelector('[name="price"]');

var addressInputElement = document.querySelector('[name="address"]');

var timeInSelectElement = document.querySelector('[name="timein"]');
var timeInOptionElements = timeInSelectElement.querySelectorAll('option');

var timeOutSelectElement = document.querySelector('[name="timeout"]');
var timeOutOptionElements = timeOutSelectElement.querySelectorAll('option');

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

var generateRandomAdv = function (number) {
  var advList = [];

  for (var i = 0; i < number; i++) {
    advList.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomData(TITLES),
        price: getRandomInt(MAX_MONEY),
        type: getRandomData(TYPES),
        rooms: getRandomIntInclusive(1, MAX_ROOM),
        guests: getRandomIntInclusive(1, MAX_GUEST),
        checkin: getRandomData(TIMES),
        checkout: getRandomData(TIMES),
        features: getRandomArray(FEATURES),
        description: getRandomData(DESCRIPTIONS),
        photos: getRandomArray(PHOTOS)
      },
      location: {
        x: getRandomIntInclusive(1, userMapElement.offsetWidth),
        y: getRandomIntInclusive(MIN_Y, MAX_Y)
      }
    });
    advList[i].offer.address = advList[i].location.x + ', ' + advList[i].location.y;
  }
  return advList;
};

var showMapDialog = function () {
  userMapElement.classList.remove('map--faded');
};

var renderPin = function (advData) {
  var pinElement = mapPinsTemplate.cloneNode(true);

  pinElement.style.left = (advData.location.x + pinElement.clientWidth / 2) + 'px';
  pinElement.style.top = (advData.location.y + pinElement.clientHeight) + 'px';
  pinElement.querySelector('img').src = advData.author.avatar;
  pinElement.querySelector('img').alt = advData.offer.title;

  return pinElement;
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

    var closePopup = function () {
      popupElement.remove();
    };

    popupCloseElement.addEventListener('click', function () {
      closePopup();
    });

    window.addEventListener('keydown', function (evt) {
      onElementEscPress(evt, closePopup);
    });

  });
};

var renderPins = function (advList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advList.length; i++) {
    var pin = renderPin(advList[i]);

    addPinClickListener(pin, advList[i]);

    fragment.appendChild(pin);
  }

  pinListElement.appendChild(fragment);
};

var getCapacityText = function (rooms, guests) {
  var text = rooms;
  var firstDigitRooms = getLastDigit(rooms);

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
  cardElement.querySelector('.popup__type').textContent = getValueByKey(TYPES_OPTIONS, name).name;
  cardElement.querySelector('.popup__text--capacity').textContent = getCapacityText(adv.offer.rooms, adv.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = adv.offer.description;
  cardElement.querySelector('.popup__avatar').src = adv.author.avatar;

  fillFeaturesList(listFeaturesElement, listFeaturesData);
  fillPhotosList(listPhotosElement, listPhotosData);

  return cardElement;
};

var addCard = function (advItem) {
  var adv = renderCard(advItem);
  userMapElement.insertBefore(adv, filtersContainerElement);
};

var doChangeDisabledElement = function (element, isDisabled) {
  element.disabled = isDisabled;
};

var doInactiveForm = function () {
  doChangeDisabledElement(formHeaderFieldsetElement, true);

  for (var i = 0; i < formFieldsetElements.length; i++) {
    doChangeDisabledElement(formFieldsetElements[i], true);
  }

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

var onMainPinEnterPress = function (evt) {
  onElementEnterPress(evt, doActiveMode);
};

var doActiveMode = function () {
  activeMode = true;
  fillAddressInput();

  doChangeDisabledElement(formHeaderFieldsetElement, false);

  for (var i = 0; i < formFieldsetElements.length; i++) {
    doChangeDisabledElement(formFieldsetElements[i], false);
  }

  formElement.classList.remove('ad-form--disabled');

  showMapDialog();
  var advArray = generateRandomAdv(NUMBER_OF_ADV);
  renderPins(advArray);

  pinMainElement.removeEventListener('mousedown', doActiveMode);
  pinMainElement.removeEventListener('keydown', onMainPinEnterPress);
};

var addMainPinListener = function () {
  pinMainElement.addEventListener('mousedown', doActiveMode);
  pinMainElement.addEventListener('keydown', onMainPinEnterPress);
};

var fillAddressInput = function () {
  var top = pinMainElement.offsetTop;
  var leftWithWidth = pinMainElement.offsetLeft + pinMainElement.offsetWidth / 2;
  var topWithHeight = activeMode ? (top + pinMainElement.offsetHeight) : (top + pinMainElement.offsetHeight / 2);

  formAddressInputElement.value = leftWithWidth + ', ' + topWithHeight;
  formAddressInputElement.nodeValue = leftWithWidth + ', ' + topWithHeight;
};

var getSelectedElementValue = function (arr) {

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].selected) {
      return arr[i].value;
    }
  }

  return '';
};

var doGuestsValidation = function () {
  var roomValue = Number(getSelectedElementValue(roomOptionElements));

  for (var i = 0; i < capacityOptionElements.length; i++) {
    var capacityValue = Number(capacityOptionElements[i].value);

    if (roomValue >= capacityValue && roomValue !== MAX_ROOM && capacityValue !== 0) {
      doChangeDisabledElement(capacityOptionElements[i], false);
      capacityOptionElements[i].selected = true;
    } else if (capacityValue === 0 && roomValue === MAX_ROOM) {
      doChangeDisabledElement(capacityOptionElements[i], false);
      capacityOptionElements[i].selected = true;
    } else {
      doChangeDisabledElement(capacityOptionElements[i], true);
    }
  }

};

var doMinPriceValue = function () {
  var selectedType = getSelectedElementValue(typeOptionElements);
  var typeValue = getValueByKey(TYPES_OPTIONS, selectedType).minPrice;
  priceInputElement.min = typeValue;
  priceInputElement.placeholder = typeValue;
};

var doChangeTimeOut = function () {
  var selectedValue = getSelectedElementValue(timeOutOptionElements);

  for (var i = 0; i < timeInOptionElements.length; i++) {
    if (selectedValue === timeInOptionElements[i].value) {
      timeInOptionElements[i].selected = true;
      return;
    }
  }

};

var doChangeTimeIn = function () {
  var selectedValue = getSelectedElementValue(timeInOptionElements);

  for (var i = 0; i < timeOutOptionElements.length; i++) {
    if (selectedValue === timeOutOptionElements[i].value) {
      timeOutOptionElements[i].selected = true;
      return;
    }
  }

};

var doValidationForm = function () {
  doGuestsValidation();
  doMinPriceValue();

  addressInputElement.readOnly = true;

  roomSelectElement.addEventListener('change', doGuestsValidation);
  typeSelectElement.addEventListener('change', doMinPriceValue);

  timeOutSelectElement.addEventListener('change', doChangeTimeOut);
  timeInSelectElement.addEventListener('change', doChangeTimeIn);
};

var init = function () {
  doInactiveForm(formFieldsetElements);
  addMainPinListener();
  fillAddressInput();
  doValidationForm();
};

init();
