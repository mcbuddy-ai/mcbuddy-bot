# 🤖 McBuddy Bot

[![AI Capable](https://img.shields.io/badge/AI-Capable-brightgreen?style=flat&logo=openai&logoColor=white)](https://github.com/mcbuddy-ai/mcbuddy-bot)
[![GitHub Release](https://img.shields.io/github/v/release/mcbuddy-ai/mcbuddy-bot?style=flat&logo=github&color=blue)](https://github.com/mcbuddy-ai/mcbuddy-bot/releases)
[![Docker](https://img.shields.io/badge/Docker-Available-2496ED?style=flat&logo=docker&logoColor=white)](https://github.com/mcbuddy-ai/mcbuddy-bot/pkgs/container/mcbuddy-bot)
[![Bun](https://img.shields.io/badge/Bun-1.2.18-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**语言**: [🇷🇺 Русский](README.md) | [🇺🇸 English](README.EN.md) | 🇨🇳 中文

**McBuddy Bot** — 🤖 用于与 MCBuddy 通信的 Telegram 机器人 — 询问有关 Minecraft 的问题并立即获得清晰、准确的答案！📱

> **注意**：机器人需要运行中的 MCBuddy Server 才能工作。

## 功能特性

### 核心功能

- **命令 /ask** — 询问有关 Minecraft 的问题并获得带上下文的 AI 答案
- **直接消息** — 无需命令即可与机器人聊天，只需发送消息
- **视觉反馈** — 请求处理期间的"正在输入"指示器
- **俄语界面** — 所有消息和答案都使用俄语

### 集成

- **MCBuddy Server API** — 与后端交互以接收 AI 答案
- **OpenRouter 支持** — 可以使用您自己的令牌
- **Telegram Bot API** — 完整的 Telegram 集成

## 使用方法

### 开始使用

1. 在 Telegram 上找到机器人：`@mcbuddy_bot`（或通过 @BotFather 创建您自己的机器人）
2. 使用 `/start` 命令开始对话

### 可用命令

#### 主要命令
- `/start` — 欢迎消息和机器人介绍
- `/help` — 命令参考和使用示例
- `/ask <问题>` — 询问有关 Minecraft 的问题

#### 直接交流
- 直接向机器人提问 — 它将在不使用命令的情况下回应

### 工作原理

1. 向机器人发送问题（通过 `/ask` 命令或直接发送）
2. 机器人向 MCBuddy Server 发送请求
3. 接收带有 Minecraft Wiki 上下文的 AI 答案
4. 继续对话 — 机器人会记住对话上下文

## 兼容性

- **Telegram Bot API** — 在私聊中工作
- **MCBuddy Server** — 需要运行中的服务器
- **运行时**: Bun 1.0+
- **部署**: Docker + Docker Compose

## 部署

### Docker Compose（推荐）

1. 克隆仓库：
```bash
git clone https://github.com/mcbuddy-ai/mcbuddy-bot
cd mcbuddy-bot
```

2. 配置环境变量：
```bash
# 创建 .env 文件
cp .env.sample .env

# 必需的变量：
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
MCBUDDY_SERVER_URL=https://mcbuddy.ru

# 可选：
X_OPENROUTER_TOKEN=sk-or-your-token-here
```

> **注意**：通过 [@BotFather](https://t.me/botfather) 获取您的 Telegram 机器人令牌。

3. 启动服务：
```bash
docker compose up -d
```

4. 检查状态：
```bash
docker compose logs -f mcbuddy-bot
```

### 使用预构建镜像的 Docker Compose

如果您想使用预构建镜像：

1. 在 `docker-compose.yml` 中声明 mcbuddy-bot 服务：

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

> **注意**：您需要从 `.env` 文件或其他任何方便的方式提供所有环境变量。

2. 启动服务：
```bash
docker compose up -d
```

### 裸机部署

要求：
- Bun 1.0+

1. 安装依赖项：
```bash
curl -fsSL https://bun.sh/install | bash
bun install
```

2. 配置环境变量：
```bash
cp .env.sample .env
# 使用 Telegram 机器人令牌和服务器 URL 编辑 .env
```

3. 运行机器人：
```bash
# 开发环境
bun run dev

# 生产环境
bun run build
bun run start
```

### 运行时配置

机器人支持 OpenRouter 令牌覆盖：

```bash
# 在 .env 文件中指定您的 OpenRouter 令牌：
X_OPENROUTER_TOKEN=sk-or-your-custom-token-here
```

此令牌将通过 `X-OpenRouter-Token` 标头传递给 MCBuddy Server，允许您使用自己的 OpenRouter 帐户进行 AI 请求。

## 技术栈

- **TypeScript** — 主要开发语言
- **Bun.js** — 快速的 JS 运行时和包管理器
- **Node Telegram Bot API** — 用于 Telegram Bot API 交互的库
- **MCBuddy Server API** — 用于获取 AI 答案的后端集成
- **Docker + Docker Compose** — 容器化和部署
- **tslog** — 结构化日志记录

## AI 参与

AI 工具被选择性地用于生成部分文档。主要架构、命令处理和 Telegram API 集成是手动开发的。提交完全由 AI 代理编写，在可能的情况下尽量减少 AI 参与。

## 相关项目链接

[McBuddy Server](https://github.com/mcbuddy-ai/mcbuddy-server) — 🛠️⚡ MCBuddy AI 助手的后端，集成 OpenRouter 和请求处理

[McBuddy Spigot](https://github.com/mcbuddy-ai/mcbuddy-spigot) — 💬 MCBuddy 集成的 Spigot 插件 — 添加 `/ask` 命令，直接在 Minecraft 服务器聊天中向 AI 助手提问！🎮

## 来自"同一作者"系列

[Xi Manager](https://github.com/mairwunnx/xi) — 🀄️ 基于 AI 的 Telegram 机器人，风格化为 Xi 的私人助理。伟大领袖的私人助理，随时准备回答人民群众的问题。

[Dickobrazz](https://github.com/mairwunnx/dickobrazz) — 🌶️ Dickobrazz 机器人，又名 dicobot，能够精确到厘米测量你的单位大小。现代化的技术型测量器，带有赛季系统和游戏化。

[Louisepizdon](https://github.com/MairwunNx/louisepizdon) — 🥀 Louisepizdon，一个比你奶奶还诚实的 AI Telegram 机器人。会正确评估你，根据照片分析你衣服的定价！

[Mo'Bosses](https://github.com/mairwunnx/mobosses) — 🏆 **Mo'Bosses** 是最好的 RPG 插件，将普通的怪物转变为史诗级的 Boss，拥有**高级玩家进阶系统**。与其他插件不同，这里每场战斗都很重要，每个等级都会开启新的可能性！⚔

[Mo'Joins](https://github.com/mairwunnx/mojoins) — 🎉 自定义加入/退出：消息、声音、粒子、烟花和加入后的保护。全部用于 PaperMC。

[Mo'Afks](https://github.com/mairwunnx/moafks) — 🛡️ 在线时间暂停 — 现在可能了。PaperMC 插件，为玩家提供安全的 AFK 模式：伤害免疫、无碰撞、被怪物忽略、自动检测不活动和整洁的视觉效果。

---

![image](./media.png)

🇷🇺 **在俄罗斯用爱制作。** ❤️

**McBuddy** — 是对 Minecraft 游戏和现代技术的热爱的结晶。该项目是为俄语游戏社区创建的，注重代码质量和用户体验。

> 🫡 Made by Pavel Erokhin (Павел Ерохин), aka mairwunnx.

