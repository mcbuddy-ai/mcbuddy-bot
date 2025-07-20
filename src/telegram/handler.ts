import TelegramBot from 'node-telegram-bot-api';
import { ask } from '../features/ask/ask.service';
import { logger } from '../shared/logging';
import { getWelcomeMessage, helpMessage, messageProcessingError, noQuestionMessage, questionProcessingError, sendMessage } from './messages';

export const start = (bot: TelegramBot) => (msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;
  const userName = msg.from?.first_name || 'Друг';

  sendMessage(bot, chatId, getWelcomeMessage(userName));
};

export const help = (bot: TelegramBot) => (msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;

  sendMessage(bot, chatId, helpMessage);
};

export const askCommand = (bot: TelegramBot) => async (msg: TelegramBot.Message, match: RegExpExecArray | null) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id.toString() || 'unknown';
  const question = match?.[1];

  if (!question) {
    sendMessage(bot, chatId, noQuestionMessage);
    return;
  }

  bot.sendChatAction(chatId, 'typing');

  try {
    const answer = await ask(question, userId);
    sendMessage(bot, chatId, answer);
  } catch (error) {
    logger.error('❌ An error occurred while processing the question:', error);
    sendMessage(bot, chatId, questionProcessingError);
  }
};

export const message = (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
  if (msg.text?.startsWith('/') || msg.from?.is_bot) {
    return;
  }

  const chatId = msg.chat.id;
  const userId = msg.from?.id.toString() || 'unknown';
  const question = msg.text;

  if (!question) {
    return;
  }

  bot.sendChatAction(chatId, 'typing');

  try {
    const answer = await ask(question, userId);
    sendMessage(bot, chatId, answer);
  } catch (error) {
    logger.error('❌ An error occurred while processing the message:', error);
    sendMessage(bot, chatId, messageProcessingError);
  }
};
