import './style.css';

document.addEventListener('DOMContentLoaded', function () {
  const time = 3000; // время анимации в мс
  const step = 1;
  let animated = false;

  function outNum(num, elemSelector) {
    const elem = document.querySelector(elemSelector);
    let n = 0;
    const t = Math.round(time / (num / step));

    const interval = setInterval(() => {
      n += step;
      if (n >= num) {
        clearInterval(interval);
        n = num;
      }
      elem.innerHTML = n;
    }, t);
  }

  function checkScroll() {
    const elem = document.querySelector('#outCar');
    const rect = elem.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && !animated) {
      animated = true;
      outNum(100, '#outCar');
      outNum(320, '#outTo');
    }
  }

  window.addEventListener('scroll', checkScroll);
  window.addEventListener('load', checkScroll);

  const buttons = document.querySelectorAll('.carusel__button');
  const photos = document.querySelectorAll('.carusel__photo');
  const photosWrapper = document.querySelector('.carusel__photos');

  function activateSlide(index) {
    buttons.forEach((btn, i) => btn.classList.toggle('active', i === index));
    photos.forEach((photo, i) => photo.classList.toggle('active', i === index));

    // Смещаем по количеству неактивных фото
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += 300 + 32; // ширина неактивных фото + gap
    }

    photosWrapper.style.transform = `translateX(-${offset}px)`;
  }

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => activateSlide(index));
  });

  // 👉 Активируем первую
  activateSlide(0);

  document.querySelectorAll('.accordion__toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isActive = item.classList.contains('accordion__item--active');
      document.querySelectorAll('.accordion__item').forEach((el) => {
        el.classList.remove('accordion__item--active');
      });
      if (!isActive) {
        item.classList.add('accordion__item--active');
      }
    });
  });
});
