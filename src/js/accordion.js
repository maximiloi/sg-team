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
