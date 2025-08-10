// botToken и adminIds должны быть предоставлены сервером для защиты .env данных
async function sendToTelegram(name, phone) {
  const response = await fetch('http://localhost:3004/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, phone }),
  });
  return response.ok;
}

document
  .getElementById('callbackForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (name.length < 3) {
      document.getElementById('status').innerText =
        'Имя должно содержать не менее 3 букв.';
      return;
    }

    if (!/^\+7\d{10}$/.test(phone)) {
      document.getElementById('status').innerText =
        'Введите корректный номер телефона, начинающийся с +7 и содержащий 11 цифр.';
      return;
    }

    try {
      const success = await sendToTelegram(name, phone);
      if (success) {
        document.getElementById('status').style.color = 'green';
        document.getElementById('status').innerText =
          'Заявка отправлена! Мы скоро свяжемся с вами.';
        document.getElementById('callbackForm').reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      document.getElementById('status').style.color = 'red';
      document.getElementById('status').innerText =
        'Ошибка при отправке заявки. Попробуйте позже.';
    }
  });
