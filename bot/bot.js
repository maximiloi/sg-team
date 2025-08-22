import 'dotenv/config';
import { Bot } from 'grammy';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

bot.command('start', (ctx) =>
  ctx.reply(
    '👋 Привет! Я бот автосервиса <b>Super Garage Team</b>. Я буду уведомлять менеджера о новых заявках 🚗',
    { parse_mode: 'HTML' }
  )
);

bot.on('message', (ctx) => {
  console.log('Новое сообщение:', ctx.message);
});

bot.start();

console.log('Бот запущен!');
