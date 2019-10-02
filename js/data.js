'use strict';

(function () {

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

  var MAX_MONEY = 1000000;
  var MAX_GUEST = 10;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var generateRandomAdv = function (number) {
    var advList = [];

    for (var i = 0; i < number; i++) {
      advList.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.util.getRandomData(TITLES),
          price: window.util.getRandomInt(MAX_MONEY),
          type: window.util.getRandomData(TYPES),
          rooms: window.util.getRandomIntInclusive(1, window.variables.MAX_ROOM),
          guests: window.util.getRandomIntInclusive(1, MAX_GUEST),
          checkin: window.util.getRandomData(TIMES),
          checkout: window.util.getRandomData(TIMES),
          features: window.util.getRandomArray(FEATURES),
          description: window.util.getRandomData(DESCRIPTIONS),
          photos: window.util.getRandomArray(PHOTOS)
        },
        location: {
          x: window.util.getRandomIntInclusive(1, window.variables.userMapElement.offsetWidth),
          y: window.util.getRandomIntInclusive(MIN_Y, MAX_Y)
        }
      });
      advList[i].offer.address = advList[i].location.x + ', ' + advList[i].location.y;
    }
    return advList;
  };

  window.generateRandomAdv = generateRandomAdv;

})();
