import { logger } from '../../shared/logging';
import { server, xOpenRouterToken } from './ask.env';
import type { AskRequest, AskResponse } from './ask.types';

export async function ask(question: string, userId: string): Promise<string> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (xOpenRouterToken) {
      headers['X-OpenRouter-Token'] = xOpenRouterToken;
    }

    const response = await fetch(`${server}/api/ask`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ question, platform: 'telegram', user_id: userId } as AskRequest)
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json() as AskResponse;
    return data.answer || '❌ Не удалось получить ответ от сервера';
  } catch (error) {
    logger.error('❌ An error occurred while requesting the server:', error);
    return '❌ Извините, сервер временно недоступен. Попробуйте позже.';
  }
}
