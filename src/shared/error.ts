export const fail = (message: string) => () => { throw new Error(message); };

export interface ApiError {
  code: string;
  message: string;
  statusCode?: number;
}

export interface ErrorResponse {
  error: string;
  code: string;
  status: string;
  timestamp: string;
}

export const ERROR_CODES = {
  EMPTY_ACTION: 'EMPTY_ACTION',
  ACTION_TOO_LONG: 'ACTION_TOO_LONG', 
  AI_ERROR: 'AI_ERROR',
  TOO_MANY_COMMANDS: 'TOO_MANY_COMMANDS',
  EMPTY_QUESTION: 'EMPTY_QUESTION',
  QUESTION_TOO_LONG: 'QUESTION_TOO_LONG',
  BAD_REQUEST: 'BAD_REQUEST',
  METHOD_NOT_SUPPORTED: 'METHOD_NOT_SUPPORTED',
  
  PARSE_ERROR: 'PARSE_ERROR',
  INVALID_FORMAT: 'INVALID_FORMAT',
  AI_REQUEST_FAILED: 'AI_REQUEST_FAILED',
  REDIS_ERROR: 'REDIS_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  NO_AI_RESPONSE: 'NO_AI_RESPONSE',
  QUEUE_ERROR: 'QUEUE_ERROR',
  PROCESSING_ERROR: 'PROCESSING_ERROR',
} as const;

const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.EMPTY_QUESTION]: '❌ Вопрос не может быть пустым',
  [ERROR_CODES.QUESTION_TOO_LONG]: '❌ Вопрос слишком длинный (максимум 1000 символов)',
  [ERROR_CODES.EMPTY_ACTION]: '❌ Описание действия не может быть пустым',
  [ERROR_CODES.ACTION_TOO_LONG]: '❌ Описание действия слишком длинное (максимум 500 символов)',
  [ERROR_CODES.TOO_MANY_COMMANDS]: '❌ Слишком много команд для выполнения (максимум 12)',
  [ERROR_CODES.AI_ERROR]: '❌ AI не смог обработать ваш запрос. Попробуйте переформулировать.',
  [ERROR_CODES.BAD_REQUEST]: '❌ Некорректный запрос. Попробуйте еще раз.',
  [ERROR_CODES.METHOD_NOT_SUPPORTED]: '❌ Метод не поддерживается',
  
  [ERROR_CODES.AI_REQUEST_FAILED]: '❌ AI-сервис временно недоступен. Попробуйте позже.',
  [ERROR_CODES.NO_AI_RESPONSE]: '❌ AI не ответил на запрос. Попробуйте позже.',
  [ERROR_CODES.NETWORK_ERROR]: '❌ Проблемы с сетью. Проверьте подключение к интернету.',
  [ERROR_CODES.REDIS_ERROR]: '❌ Проблемы с базой данных. Попробуйте позже.',
  [ERROR_CODES.QUEUE_ERROR]: '❌ Сервер перегружен. Попробуйте через несколько минут.',
  [ERROR_CODES.PROCESSING_ERROR]: '❌ Ошибка обработки запроса. Попробуйте позже.',
  [ERROR_CODES.PARSE_ERROR]: '❌ Ошибка обработки ответа AI. Попробуйте позже.',
  [ERROR_CODES.INVALID_FORMAT]: '❌ Некорректный формат ответа AI. Попробуйте позже.',
};

const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: '❌ Некорректный запрос. Попробуйте переформулировать.',
  401: '❌ Ошибка авторизации. Обратитесь к администратору.',
  403: '❌ Доступ запрещен.',
  404: '❌ Сервис не найден. Обратитесь к администратору.',
  429: '❌ Превышен лимит запросов. Подождите немного и попробуйте снова.',
  500: '❌ Внутренняя ошибка сервера. Попробуйте позже.',
  502: '❌ Сервер временно недоступен. Попробуйте позже.',
  503: '❌ Сервис временно недоступен. Попробуйте позже.',
  504: '❌ Таймаут запроса. Сервер перегружен, попробуйте позже.',
};

export const getUserErrorMessage = (error: ApiError | ErrorResponse | Error): string => {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const apiError = error;
    const message = ERROR_MESSAGES[apiError.code];
    if (message) return message;
    
    if ('statusCode' in apiError && apiError.statusCode) {
      const httpMessage = HTTP_ERROR_MESSAGES[apiError.statusCode];
      if (httpMessage) return httpMessage;
    }
  }
  
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return '❌ Запрос занял слишком много времени. AI-сервер перегружен, попробуйте позже.';
    }
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return '❌ Проблемы с подключением к серверу. Проверьте интернет-соединение.';
    }
  }
  
  return '❌ Произошла неожиданная ошибка. Попробуйте позже.';
};

export const parseErrorFromResponse = async (response: Response): Promise<ApiError> => {
  try {
    const errorData = await response.json() as ErrorResponse;
    return {
      code: errorData.code || 'UNKNOWN_ERROR',
      message: errorData.error || 'Unknown error',
      statusCode: response.status,
    };
  } catch {
    return {
      code: 'HTTP_ERROR',
      message: `HTTP ${response.status}: ${response.statusText}`,
      statusCode: response.status,
    };
  }
};