document.querySelectorAll('[data-modal]').forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    document.getElementById(modalId).showModal();
  });
});

document.querySelectorAll('.modal__close').forEach((closeBtn) => {
  closeBtn.addEventListener('click', () => {
    closeBtn.closest('dialog').close();
  });
});

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const clickedInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!clickedInDialog) {
      dialog.close();
    }
  });
});
