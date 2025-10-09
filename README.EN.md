# 🤖 McBuddy Bot

[![AI Capable](https://img.shields.io/badge/AI-Capable-brightgreen?style=flat&logo=openai&logoColor=white)](https://github.com/mcbuddy-ai/mcbuddy-bot)
[![Docker](https://img.shields.io/badge/Docker-Available-2496ED?style=flat&logo=docker&logoColor=white)](https://github.com/mcbuddy-ai/mcbuddy-bot)
[![Bun](https://img.shields.io/badge/Bun-1.0+-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Language**: [🇷🇺 Русский](README.md) | 🇺🇸 English | [🇨🇳 中文](README.CN.md)

**McBuddy Bot** — 🤖 Telegram bot for communicating with MCBuddy — ask about Minecraft and instantly get clear, accurate answers! 📱

> **Note**: The bot requires a running MCBuddy Server to function.

## Features

### Core Functionality

- **Command /ask** — ask questions about Minecraft and get AI-powered answers with context
- **Direct messages** — chat with the bot without commands, just write messages
- **Visual feedback** — "typing" indicator during request processing
- **Russian language interface** — all messages and answers in Russian

### Integration

- **MCBuddy Server API** — interaction with backend to receive AI answers
- **OpenRouter support** — ability to use your own token
- **Telegram Bot API** — full Telegram integration

## Usage

### Getting Started

1. Find the bot on Telegram: `@mcbuddy_bot` (or create your own via @BotFather)
2. Start a conversation with the `/start` command

### Available Commands

#### Main Commands
- `/start` — welcome message and bot introduction
- `/help` — command reference and usage examples
- `/ask <question>` — ask a question about Minecraft

#### Direct Communication
- Simply write questions to the bot — it will respond without using commands

### How It Works

1. Send a question to the bot (via `/ask` command or directly)
2. The bot sends a request to MCBuddy Server
3. Receive an AI-powered answer with Minecraft Wiki context
4. Continue the dialogue — the bot remembers conversation context

## Compatibility

- **Telegram Bot API** — works in private chats
- **MCBuddy Server** — requires a running server
- **Runtime**: Bun 1.0+
- **Deployment**: Docker + Docker Compose

## Deployment

### Docker Compose (recommended)

1. Clone the repository:
```bash
git clone https://github.com/mcbuddy-ai/mcbuddy-bot
cd mcbuddy-bot
```

2. Configure environment variables:
```bash
# Create .env file
cp .env.sample .env

# Required variables:
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
MCBUDDY_SERVER_URL=https://mcbuddy.ru

# Optional:
X_OPENROUTER_TOKEN=sk-or-your-token-here
```

> **Note**: Get your Telegram bot token via [@BotFather](https://t.me/botfather).

3. Start the services:
```bash
docker compose up -d
```

4. Check the status:
```bash
docker compose logs -f mcbuddy-bot
```

### Bare Metal

Requirements:
- Bun 1.0+

1. Install dependencies:
```bash
curl -fsSL https://bun.sh/install | bash
bun install
```

2. Configure environment variables:
```bash
cp .env.sample .env
# Edit .env with Telegram bot token and server URL
```

3. Run the bot:
```bash
# Development
bun run dev

# Production
bun run build
bun run start
```

### Runtime Configuration

The bot supports OpenRouter token override:

```bash
# In .env file, specify your OpenRouter token:
X_OPENROUTER_TOKEN=sk-or-your-custom-token-here
```

This token will be passed to MCBuddy Server via the `X-OpenRouter-Token` header, allowing you to use your own OpenRouter account for AI requests.

## Tech Stack

- **TypeScript** — main development language
- **Bun.js** — fast JS runtime and package manager
- **Node Telegram Bot API** — library for Telegram Bot API interaction
- **MCBuddy Server API** — backend integration for AI answers
- **Docker + Docker Compose** — containerization and deployment
- **tslog** — structured logging

## AI Participation

AI tools were used selectively for generating part of the documentation. The main architecture, command handling, and Telegram API integration were developed manually. Commits were fully written by an AI agent, with AI participation minimized where possible.

## Links to Related Projects

[McBuddy Server](https://github.com/mcbuddy-ai/mcbuddy-server) — 🛠️⚡ Backend for MCBuddy AI assistant with OpenRouter integration and request processing

[McBuddy Spigot](https://github.com/mcbuddy-ai/mcbuddy-spigot) — 💬 Spigot plugin for MCBuddy integration — adds `/ask` command for AI assistant questions directly in Minecraft server chat! 🎮

## From the Series "By the Same Author"

[Xi Manager](https://github.com/mairwunnx/xi) — 🀄️ AI-powered Telegram bot styled as Xi's personal assistant. A personal assistant to the great leader, ready to answer questions from the common people.

[Dickobrazz](https://github.com/mairwunnx/dickobrazz) — 🌶️ Dickobrazz bot, aka dicobot, capable of measuring your unit size to the nearest centimeter. A modern and technological cockometer with seasons system and gamification.

[Louisepizdon](https://github.com/MairwunNx/louisepizdon) — 🥀 Louisepizdon, an AI Telegram bot that's more honest than your grandmother. Will evaluate you properly, breaking down the pricing of your clothes from a photo!

[Mo'Bosses](https://github.com/mairwunnx/mobosses) — 🏆 **Mo'Bosses** is the best RPG plugin that transforms ordinary mobs into epic bosses with an **advanced player progression system**. Unlike other plugins, here every fight matters, and each level opens new possibilities! ⚔

[Mo'Joins](https://github.com/mairwunnx/mojoins) — 🎉 Custom joins/quits: messages, sounds, particles, fireworks, and protection after joining. All for PaperMC.

[Mo'Afks](https://github.com/mairwunnx/moafks) — 🛡️ Pause in online time — now possible. A plugin for PaperMC that gives players a safe AFK mode: damage immunity, no collisions, ignored by mobs, auto-detect inactivity, and neat visual effects.

---

![image](./media.jpg)

🇷🇺 **Made in Russia with love.** ❤️

**McBuddy** — is the result of love for Minecraft and modern technologies. The project is created for the Russian-speaking gaming community, with care for code quality and user experience.

> 🫡 Made by Pavel Erokhin (Павел Ерохин), aka mairwunnx.

