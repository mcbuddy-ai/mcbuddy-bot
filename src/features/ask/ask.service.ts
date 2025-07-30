import { logger } from '../../shared/logging';
import { getUserErrorMessage, parseErrorFromResponse } from '../../shared/error';
import { server, xOpenRouterToken } from './ask.env';
import type { AskRequest, AskResponse } from './ask.types';

const REQUEST_TIMEOUT = 5 * 60 * 1000;

const createHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (xOpenRouterToken) {
    headers['X-OpenRouter-Token'] = xOpenRouterToken;
  }

  return headers;
};

export async function ask(question: string, userId: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  try {
    logger.info(`🔄 Sending request to server for user: ${userId}`);
    
    const response = await fetch(`${server}/api/ask`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify({ question, platform: 'telegram', user_id: userId } as AskRequest),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const apiError = await parseErrorFromResponse(response);
      logger.error(`Server error for user ${userId}:`, apiError);
      return getUserErrorMessage(apiError);
    }

    const data = await response.json() as AskResponse;
    logger.info(`✅ Successfully received response for user: ${userId}`);
    return data.answer || '❌ Не удалось получить ответ от сервера';
    
  } catch (error) {
    clearTimeout(timeoutId);
    logger.error(`❌ Request failed for user ${userId}:`, error);
    return getUserErrorMessage(error instanceof Error ? error : new Error(String(error)));
  }
}