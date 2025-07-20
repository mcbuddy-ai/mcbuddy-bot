import TelegramBot from 'node-telegram-bot-api';

export type MessageHandler = (msg: TelegramBot.Message) => void | Promise<void>;
export type CommandHandler = (msg: TelegramBot.Message, match: RegExpExecArray | null) => void | Promise<void>; 