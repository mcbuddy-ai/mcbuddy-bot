import TelegramBot from 'node-telegram-bot-api';
import { logger } from '../shared/logging';
import { ask } from '../features/ask/ask.service';
import { 
  getWelcomeMessage, 
  helpMessage, 
  noQuestionMessage, 
  questionProcessingError, 
  messageProcessingError 
} from './messages';

export const start = (bot: TelegramBot) => (msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;
  const userName = msg.from?.first_name || 'Друг';
  
  bot.sendMessage(chatId, getWelcomeMessage(userName));
};

export const help = (bot: TelegramBot) => (msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, helpMessage);
};

export const askCommand = (bot: TelegramBot) => async (msg: TelegramBot.Message, match: RegExpExecArray | null) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id.toString() || 'unknown';
  const question = match?.[1];

  if (!question) {
    bot.sendMessage(chatId, noQuestionMessage);
    return;
  }

  bot.sendChatAction(chatId, 'typing');

  try {
    const answer = await ask(question, userId);
    bot.sendMessage(chatId, answer);
  } catch (error) {
    logger.error('❌ An error occurred while processing the question:', error);
    bot.sendMessage(chatId, questionProcessingError);
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
    bot.sendMessage(chatId, answer);
  } catch (error) {
    logger.error('❌ An error occurred while processing the message:', error);
    bot.sendMessage(chatId, messageProcessingError);
  }
};
