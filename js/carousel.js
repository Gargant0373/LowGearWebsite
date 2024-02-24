document.addEventListener('DOMContentLoaded', function () {
  // IMAGE SLIDES & CIRCLES ARRAYS, & COUNTER

  const carousells = {};

  var containers = document.getElementsByClassName('slideshowContainer');
  Array.from(containers).forEach(function (carousel) {
    var imageSlides = carousel.getElementsByClassName('imageSlides');
    var circles = carousel.getElementsByClassName('circle');
    var leftArrow = carousel.getElementsByClassName('leftArrow')[0];
    var rightArrow = carousel.getElementsByClassName('rightArrow')[0];

    leftArrow.addEventListener('click', arrowClick);
    rightArrow.addEventListener('click', arrowClick);

    carousells[carousel.id] = {
      imageSlides: imageSlides,
      circles: circles,
      leftArrow: leftArrow,
      rightArrow: rightArrow,
      counter: 0
    };
  });

  // HIDE ALL IMAGES FUNCTION
  function hideImages(id) {
    var carousel = carousells[id];
    var imageSlides = carousel.imageSlides;

    for (var i = 0; i < imageSlides.length; i++) {
      imageSlides[i].classList.remove('visible');
    }
  }

  // REMOVE ALL DOTS FUNCTION
  function removeDots(id) {
    var carousel = carousells[id];
    var circles = carousel.circles;
    var imageSlides = carousel.imageSlides;

    for (var i = 0; i < imageSlides.length; i++) {
      circles[i].classList.remove('dot');
    }
  }

  // SINGLE IMAGE LOOP/CIRCLES FUNCTION
  function imageLoop(id) {
    var carousel = carousells[id];

    var currentDot = carousel.circles[carousel.counter];
    var currentImage = carousel.imageSlides[carousel.counter];

    currentImage.classList.add('visible');
    removeDots(id);
    currentDot.classList.add('dot');

    carousells[id].counter++;
  }

  // LEFT & RIGHT ARROW FUNCTION & CLICK EVENT LISTENERS
  function arrowClick(e) {
    e.preventDefault();
    var id = e.target.parentElement.id;
    var carousel = carousells[id];
    
    var target = e.target;
    if (target == carousel.leftArrow) {
      clearInterval(imageSlideshowInterval);
      hideImages(id);
      removeDots(id);
      if (carousel.counter == 1)
        carousel.counter = (carousel.imageSlides.length - 1);
      else
        carousel.counter -= 2;

      imageLoop(id);
      imageSlideshowInterval = setInterval(slideshow, 10000);
    } else if (target == carousel.rightArrow) {
      clearInterval(imageSlideshowInterval);
      hideImages(id);
      removeDots(id);
      if (carousel.counter >= carousel.imageSlides.length)
        carousel.counter = 0;

      imageLoop(id);
      imageSlideshowInterval = setInterval(slideshow, 10000);
    }
  }

  // IMAGE SLIDE FUNCTION
  function slideshow() {
    for (var id in carousells) {
      var counter = carousells[id].counter;
      var imageSlides = carousells[id].imageSlides;
      if (counter < imageSlides.length) {
        imageLoop(id);
      } else {
        carousells[id].counter = 0;
        hideImages(id);
        imageLoop(id);
      }
    }
  }

  slideshow();
  var imageSlideshowInterval = setInterval(slideshow, 10000);
});