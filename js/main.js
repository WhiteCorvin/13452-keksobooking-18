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
var NUMBER_OF_ADV = 8;
var MAX_MONEY = 1000000;
var MAX_ROOM = 100;
var MAX_GUEST = 10;
var MIN_Y = 130;
var MAX_Y = 630;

var userMapElement = document.querySelector('.map');
var mapPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinListElement = document.querySelector('.map__pins');

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
  var arrayLength = getRandomInt(getRandomIntInclusive(1, 10));
  for (var i = 0; i < arrayLength; i++) {
    randomArr.push(arr[i]);
  }

  return randomArr;
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

var renderPins = function (advList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advList.length; i++) {
    var pin = renderPin(advList[i]);
    fragment.appendChild(pin);
  }

  pinListElement.appendChild(fragment);
};

var init = function () {
  showMapDialog();
  var advArray = generateRandomAdv(NUMBER_OF_ADV);
  renderPins(advArray);
};

init();
