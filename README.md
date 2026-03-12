# SG Team — сайт автосервиса Super Garage Team

Веб-приложение для автосервиса **Super Garage Team** с интеграцией Telegram-бота для уведомлений о новых заявках.

🌐 **Сайт:** [sgt-service.ru](https://sgt-service.ru/)

---

## 📋 Описание

Проект представляет собой современный сайт автосервиса с функционалом:

- Лендинг с информацией об услугах, ценах и преимуществах
- Форма обратной связи для записи на сервис
- Личный кабинет с авторизацией
- Telegram-бот для уведомлений менеджера о новых заявках
- Админ-панель для управления заявками

---

## 🛠 Технологический стек

### Frontend

- **Next.js 16** — React-фреймворк с App Router
- **React 19** — UI-библиотека
- **TypeScript** — типизация
- **Tailwind CSS 4** — стилизация
- **shadcn/Radix UI** — компоненты интерфейса
- **React Hook Form + Zod** — валидация форм

### Backend

- **Next.js API Routes** — серверная логика
- **NextAuth.js (Auth.js)** — аутентификация
- **Prisma** — ORM для работы с БД
- **PostgreSQL** — база данных

### Бот

- **Grammy** — фреймворк для Telegram-бота
- **dotenv** — управление переменными окружения

---

## 📁 Структура проекта

```
sg-team/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API эндпоинты
│   │   ├── auth/         # Аутентификация
│   │   ├── board/        # Админ-панель
│   │   └── actions/      # Server Actions
│   ├── components/       # React-компоненты
│   │   ├── ui/           # Базовые UI-компоненты
│   │   ├── header/       # Компоненты шапки
│   │   ├── modal/        # Модальные окна
│   │   └── ...           # Остальные компоненты
│   ├── lib/              # Утилиты и хелперы
│   └── generated/        # Сгенерированный код Prisma
├── bot/                  # Telegram-бот
├── prisma/               # Prisma схема и миграции
├── public/               # Статические файлы
└── .github/              # GitHub workflows
```

---

## 🚀 Запуск проекта

### Требования

- Node.js 20+
- PostgreSQL
- Telegram Bot Token (для бота)

### Установка

```bash
# Установка зависимостей
npm install

# Генерация Prisma клиента
npx prisma generate

# Применение миграций
npx prisma migrate deploy

# Запуск разработки
npm run dev
```

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# База данных
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"

# NextAuth
AUTH_SECRET="your-secret-key"
AUTH_URL="http://localhost:3000"

# Telegram бот
TELEGRAM_BOT_TOKEN="your-bot-token"
```

---

## 📦 Скрипты

| Команда              | Описание                              |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Запуск сервера разработки (Turbopack) |
| `npm run build`      | Сборка продакшн-версии                |
| `npm run start`      | Запуск продакшн-сервера               |
| `npm run lint`       | Проверка ESLint                       |
| `npm run prisma`     | Prisma Studio (GUI для БД)            |
| `npm run format:tsx` | Форматирование кода Prettier          |

---

## 🤖 Telegram-бот

Бот уведомляет менеджера о новых заявках от клиентов.

**Запуск бота:**

```bash
cd bot
node bot.js
```

**Команды:**

- `/start` — приветственное сообщение

---

## 🗄 База данных

### Модели данных (Prisma)

- **User** — пользователи системы (менеджеры, админы)
- **Client** — клиенты автосервиса
- **Request** — заявки на обслуживание

---

## 📝 Основные компоненты сайта

- `Hero` — главный экран с призывом к действию
- `AdvantageList` — преимущества автосервиса
- `WhatWeFix` — перечень ремонтируемых узлов
- `PricesBlock` — блок с ценами на услуги
- `ReviewsCarousel` — отзывы клиентов
- `Calls` — блок для заказа звонка
- `HowWeWork` — этапы работы
- `ContactMap` — карта проезда и контакты
- `Header` / `Footer` — шапка и подвал сайта

---

## 👥 Автор

**iloi**

---

## 📄 Лицензия

Приватный проект (private)
