document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var images = document.querySelectorAll('img');

  for (var i = images.length; i--;) {
    getReplacement(images[i]);
    images[i].dataset.orginalImage = images[i].getAttribute('src');
    images[i].addEventListener('mouseenter', replaceImage);
    images[i].addEventListener('mouseleave', restoreImage);
  }

  function getReplacement(image) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat', true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        image.dataset.gif = data.data.image_original_url;
        // Preload, ya know
        new Image().src = data.data.image_original_url;
      }
    };
    request.send();
  }

  function replaceImage(e) {
    e.toElement.setAttribute('src', e.toElement.dataset.gif);
  }

  function restoreImage(e) {
    e.fromElement.setAttribute('src', e.fromElement.dataset.orginalImage);
  }

});
