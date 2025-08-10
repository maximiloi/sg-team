require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/send-message', async (req, res) => {
  const { name, phone } = req.body;

  if (!name || name.length < 3 || !/^\+7\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Неверные данные' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const adminIds = process.env.TELEGRAM_ADMIN_CHAT_IDS.split(',');

  const message = `📩 Новая заявка:\nИмя: ${name}\nТелефон: ${phone}`;

  try {
    await Promise.all(
      adminIds.map((id) =>
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: id, text: message }),
        })
      )
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка при отправке в Telegram:', error);
    res.status(500).json({ error: 'Ошибка при отправке' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
