module.exports = {
  apps: [
    {
      name: 'site-sgt',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/sg-team', // путь куда деплоишь проект
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
    },
    {
      name: 'telegram-bot-sgt',
      script: 'bot/bot.js',
      interpreter: 'node',
      cwd: '/var/www/sg-team', // важно, чтобы bot запускался из того же каталога
      env: {
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
        TELEGRAM_MANAGER_IDS: process.env.TELEGRAM_MANAGER_IDS,
      },
    },
  ],
};
