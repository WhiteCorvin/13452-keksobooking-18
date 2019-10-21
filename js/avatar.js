'use strict';

(function () {

  var avatarInputElement = document.querySelector('#avatar');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview').querySelector('img');

  var resetAvatarPreviewImage = function () {
    avatarPreviewElement.src = 'img/muffin-grey.svg';
  };

  avatarInputElement.addEventListener('change', function () {
    var file = avatarInputElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.variables.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

  });

  window.resetAvatarPreviewImage = resetAvatarPreviewImage;

})();
