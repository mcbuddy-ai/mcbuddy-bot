# 🤖 McBuddy Bot

> **Проект больше не поддерживается.** MCBuddy развивается в [mcbuddy-spigot](https://github.com/mcbuddy-ai/mcbuddy-spigot) и [mcbuddy-server](https://github.com/mcbuddy-ai/mcbuddy-server); Telegram-бот закрыт, репозиторий в архиве.

[![AI Capable](https://img.shields.io/badge/AI-Capable-brightgreen?style=flat&logo=openai&logoColor=white)](https://github.com/mcbuddy-ai/mcbuddy-bot)
[![GitHub Release](https://img.shields.io/github/v/release/mcbuddy-ai/mcbuddy-bot?style=flat&logo=github&color=blue)](https://github.com/mcbuddy-ai/mcbuddy-bot/releases)
[![Docker](https://img.shields.io/badge/Docker-Available-2496ED?style=flat&logo=docker&logoColor=white)](https://github.com/mcbuddy-ai/mcbuddy-bot/pkgs/container/mcbuddy-bot)
[![Bun](https://img.shields.io/badge/Bun-1.2.18-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Язык**: 🇷🇺 Русский | [🇺🇸 English](README.EN.md) | [🇨🇳 中文](README.CN.md)

**McBuddy Bot** — 🤖 Telegram-бот для общения с MCBuddy — спрашивай о Майнкрафте и мгновенно получай понятные, точные ответы! 📱

> **Примечание**: Для работы бота требуется запущенный MCBuddy Server.

## Фичи

### Основной функционал

- **Команда /ask** — задавай вопросы о Minecraft и получай AI-ответы с учётом контекста
- **Прямые сообщения** — общайся с ботом без команд, просто пиши сообщения
- **Визуальная обратная связь** — индикатор "печатает" во время обработки запроса
- **Русскоязычный интерфейс** — все сообщения и ответы на русском языке

### Интеграция

- **MCBuddy Server API** — взаимодействие с бэкендом для получения AI-ответов
- **OpenRouter поддержка** — возможность использования собственного токена
- **Telegram Bot API** — полная интеграция с Telegram

## Использование

### Начало работы

1. Найдите бота в Telegram: `@mcbuddy_bot` (или создайте своего через @BotFather)
2. Начните диалог командой `/start`

### Доступные команды

#### Основные команды
- `/start` — приветственное сообщение и знакомство с ботом
- `/help` — справка по командам и примеры использования
- `/ask <вопрос>` — задать вопрос о Minecraft

#### Прямое общение
- Просто пишите вопросы боту — он ответит без использования команд

### Как это работает

1. Отправьте вопрос боту (через команду `/ask` или напрямую)
2. Бот отправляет запрос в MCBuddy Server
3. Получите AI-ответ с учётом контекста Minecraft Wiki
4. Продолжайте диалог — бот помнит контекст разговора

## Совместимость

- **Telegram Bot API** — работает в личных чатах
- **MCBuddy Server** — требуется запущенный сервер
- **Рантайм**: Bun 1.0+
- **Деплоймент**: Docker + Docker Compose

## Деплоймент

### Docker Compose (рекомендуется)

1. Клонируйте репозиторий:
```bash
git clone https://github.com/mcbuddy-ai/mcbuddy-bot
cd mcbuddy-bot
```

2. Настройте переменные окружения:
```bash
# Создайте .env файл
cp .env.sample .env

# Обязательные переменные:
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
MCBUDDY_SERVER_URL=https://mcbuddy.ru

# Опциональные:
X_OPENROUTER_TOKEN=sk-or-your-token-here
```

> **Примечание**: Получите токен Telegram бота через [@BotFather](https://t.me/botfather).

3. Запустите сервисы:
```bash
docker compose up -d
```

4. Проверьте статус:
```bash
docker compose logs -f mcbuddy-bot
```

### Docker Compose с готовым образом

Если хотите использовать готовый образ:

1. Задекларируйте сервис mcbuddy-bot в `docker-compose.yml`:

```yaml
services:
  mcbuddy-bot:
    image: ghcr.io/mcbuddy-ai/mcbuddy-bot:1.3.0
    env_file: .env
    environment:
      TELEGRAM_BOT_TOKEN: ${TELEGRAM_BOT_TOKEN}
      MCBUDDY_SERVER_URL: ${MCBUDDY_SERVER_URL}
      X_OPENROUTER_TOKEN: ${X_OPENROUTER_TOKEN}
```

> **Примечание**: Вам потребуется передать все переменные окружения из файла `.env` или любым другим удобным способом.

2. Запустите сервисы:
```bash
docker compose up -d
```

### Bare Metal

Требования:
- Bun 1.0+

1. Установите зависимости:
```bash
curl -fsSL https://bun.sh/install | bash
bun install
```

2. Настройте переменные окружения:
```bash
cp .env.sample .env
# Отредактируйте .env с токеном Telegram бота и URL сервера
```

3. Запустите бота:
```bash
# Разработка
bun run dev

# Продакшен
bun run build
bun run start
```

### Рантайм конфигурация

Бот поддерживает переопределение токена OpenRouter:

```bash
# В .env файле укажите ваш токен OpenRouter:
X_OPENROUTER_TOKEN=sk-or-your-custom-token-here
```

Этот токен будет передан в MCBuddy Server через заголовок `X-OpenRouter-Token`, что позволит использовать ваш собственный аккаунт OpenRouter для AI-запросов.

## Стек

- **TypeScript** — основной язык разработки
- **Bun.js** — быстрый JS runtime и пакетный менеджер
- **Node Telegram Bot API** — библиотека для взаимодействия с Telegram Bot API
- **MCBuddy Server API** — интеграция с бэкендом для получения AI-ответов
- **Docker + Docker Compose** — контейнеризация и развертывание
- **tslog** — структурированное логирование

## Участие AI

AI-инструменты использовались точечно для генерации части документации. Основная архитектура, обработка команд и интеграция с Telegram API разработаны вручную. Коммиты полностью написаны AI агентом, по возможности участие ИИ сведено к минимуму.

## Ссылки на связанные проекты

[McBuddy Server](https://github.com/mcbuddy-ai/mcbuddy-server) — 🛠️⚡ Бэкенд для AI-ассистента MCBuddy с интеграцией OpenRouter и обработкой запросов

[McBuddy Spigot](https://github.com/mcbuddy-ai/mcbuddy-spigot) — 💬 Spigot-плагин для интеграции MCBuddy — добавляет команду `/ask` для вопросов к AI-ассистенту прямо в чате Minecraft сервера! 🎮

## Из серии "от того же автора"

[Xi Manager](https://github.com/mairwunnx/xi) — 🀄️ Telegram-бот с ИИ, стилизованный под личного помощника Xi. Личный помощник великого лидера, готовый отвечать на вопросы простого народа.

[Dickobrazz](https://github.com/mairwunnx/dickobrazz) — 🌶️ Дикобраз бот, он же дикобот, способен в точности до сантиметра выдать размер вашего агрегата. Современный и технологичный кокомер с системой сезонов и геймификацией.

[Louisepizdon](https://github.com/MairwunNx/louisepizdon) — 🥀 Луипиздон, Telegram-бот с ИИ, который честнее чем твоя бабушка. Оценит тебя по достоинству, разборка ценообразования твоих шмоток с фотографии!

[Mo'Bosses](https://github.com/mairwunnx/mobosses) — 🏆 **Mo'Bosses** — это лучший RPG плагин, который превращает обычных мобов в эпических боссов с **продвинутой системой прогрессии игрока**. В отличие от других плагинов, здесь каждый бой имеет значение, а каждый уровень открывает новые возможности! ⚔

[Mo'Joins](https://github.com/mairwunnx/mojoins) — 🎉 Кастомные входы/выходы: сообщения, звуки, частицы, фейерверки и защита после входа. Все для PaperMC.

[Mo'Afks](https://github.com/mairwunnx/moafks) — 🛡️ Пауза в онлайне — теперь возможна. Плагин для PaperMC, который даёт игроку безопасный режим AFK: иммунитет к урону, отсутствие коллизий, игнор мобами, авто-детект неактивности и аккуратные визуальные эффекты.

---

![image](./media.png)

🇷🇺 **Сделано в России с любовью.** ❤️

**McBuddy** — это результат любви к игре Minecraft и современным технологиям. Проект создан для русскоязычного сообщества игроков, с заботой о качестве кода и пользовательском опыте.

> 🫡 Made by Pavel Erokhin (Павел Ерохин), aka mairwunnx.
