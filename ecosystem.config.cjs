module.exports = {
  apps: [
    {
      name: 'site-sgt',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/sgt',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
    {
      name: 'telegram-bot-sgt',
      script: 'bot/bot.js',
      interpreter: 'node',
      cwd: '/var/www/sgt',
      env: {
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
        TELEGRAM_MANAGER_IDS: process.env.TELEGRAM_MANAGER_IDS,
      },
    },
  ],
};
