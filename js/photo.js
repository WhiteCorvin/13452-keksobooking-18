'use strict';

(function () {

  var photoInputElement = document.querySelector('#images');
  var photoPreviewBoxElement = document.querySelector('.ad-form__photo');

  var createImageElement = function (src) {
    var img = document.createElement('img');
    img.src = src;
    photoPreviewBoxElement.append(img);
  };

  var deleteImageElements = function () {
    var imageElements = photoPreviewBoxElement.querySelectorAll('img');
    imageElements.forEach(function (element) {
      element.remove();
    });
  };

  var getFileReader = function (file) {
    deleteImageElements();
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      createImageElement(reader.result);
    });

    reader.readAsDataURL(file);
  };

  photoInputElement.addEventListener('change', function () {
    var files = photoInputElement.files;

    [].forEach.call(files, function (element) {
      var file = element;
      var fileName = file.name.toLowerCase();

      var matches = window.variables.FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        getFileReader(file);
      }

    });
  });

  window.deleteImageElements = deleteImageElements;

})();
