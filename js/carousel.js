document.addEventListener('DOMContentLoaded', function () {

  const carousels = {};

  // Initialize carousels
  const initializeCarousels = () => {
    const containers = document.querySelectorAll('.slideshowContainer');
    containers.forEach(container => {
      const imageSlides = container.querySelectorAll('.imageSlides');
      imageSlides[0].classList.add('visible');

      const circles = container.querySelectorAll('.circle');
      const leftArrow = container.querySelector('.leftArrow');
      const rightArrow = container.querySelector('.rightArrow');

      leftArrow.addEventListener('click', () => arrowClick(container.id, -1));
      rightArrow.addEventListener('click', () => arrowClick(container.id, 1));

      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);

      carousels[container.id] = {
        imageSlides: Array.from(imageSlides),
        circles: Array.from(circles),
        leftArrow: leftArrow,
        rightArrow: rightArrow,
        counter: 0
      };
    });
  };

  // Swipe handling variables
  let xDown = null;

  function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    xDown = firstTouch.clientX;
  }

  function handleTouchMove(event) {
    if (!xDown) {
      return;
    }

    const xUp = event.touches[0].clientX;
    const xDiff = xDown - xUp;

    if (Math.abs(xDiff) > 50) { // Minimum swipe distance
      const containerId = event.currentTarget.id;
      const direction = xDiff > 0 ? 1 : -1;
      arrowClick(containerId, direction);
      xDown = null;
    }
  }

  function handleTouchEnd() {
    xDown = null;
  }

  // Hide all images
  const hideImages = (id) => {
    const carousel = carousels[id];
    carousel.imageSlides.forEach(image => image.classList.remove('visible'));
  };

  // Remove all dots
  const removeDots = (id) => {
    const carousel = carousels[id];
    carousel.circles.forEach(circle => circle.classList.remove('dot'));
  };

  // Update images and dots
  const updateCarousel = (id) => {
    const carousel = carousels[id];
    const previousImage = carousel.imageSlides[carousel.counter];
    previousImage.classList.remove('visible');
    
    carousel.counter = (carousel.counter + 1) % carousel.imageSlides.length;

    const currentDot = carousel.circles[carousel.counter];
    const currentImage = carousel.imageSlides[carousel.counter];

    currentImage.classList.add('visible');
    removeDots(id);
    currentDot.classList.add('dot');
  };

  // Handle arrow clicks
  const arrowClick = (id, increment) => {
    const carousel = carousels[id];
    clearInterval(carousel.interval);

    hideImages(id);
    removeDots(id);

    carousel.counter = (carousel.counter + increment + carousel.imageSlides.length) % carousel.imageSlides.length;
    updateCarousel(id);

    carousel.interval = setInterval(() => slideshow(), 10000);
  };

  // Slideshow function
  const slideshow = (id) => {
    updateCarousel(id);
  };

  // Initialize carousels and start slideshow
  initializeCarousels();
  for (const id in carousels) {
    const carousel = carousels[id];
    carousel.interval = setInterval(() => slideshow(id), 4000);
  }

});
