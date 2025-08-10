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

activateSlide(0);
