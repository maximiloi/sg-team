module.exports = {
  apps: [
    {
      name: 'site-sgt',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/sgt',
      env: {
        PORT: 3002,
        HOST: '127.0.0.1',
        NODE_ENV: 'production',
        AUTH_SECRET: process.env.AUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        DATABASE_URL: process.env.DATABASE_URL,
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
        TELEGRAM_MANAGER_IDS: process.env.TELEGRAM_MANAGER_IDS,
      },
    },
    {
      name: 'telegram-bot-sgt',
      script: 'bot/bot.js',
      interpreter: 'node',
      cwd: '/var/www/sgt',
      env: {
        NODE_ENV: 'production',
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
        TELEGRAM_MANAGER_IDS: process.env.TELEGRAM_MANAGER_IDS,
      },
    },
  ],
};
