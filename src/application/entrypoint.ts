import TelegramBot from 'node-telegram-bot-api';
import { logger } from '../shared/logging';
import { token } from './entrypoint.env';
import { start, help, askCommand, message } from '../telegram/handler';

logger.info("✅ MCBuddy Telegram Bot started!");

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, start(bot));
bot.onText(/\/help/, help(bot));
bot.onText(/\/ask (.+)/, askCommand(bot));

bot.on('message', message(bot));

bot.on('error', (error) => logger.error('❌ An error occurred in bot handler loop:', error));
bot.on('polling_error', (error) => logger.error('❌ An error occurred while polling:', error));

process.on('SIGTERM', () => {
  logger.info('✅ Received SIGTERM, shutting down...');
  bot.stopPolling();
});

process.on('SIGINT', () => {
  logger.info('✅ Received SIGINT, shutting down...');
  bot.stopPolling();
});

logger.info(`✅ Telegram Bot started and ready to work!`);
