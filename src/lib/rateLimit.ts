/**
 * Rate Limiter для защиты от спама и brute force атак
 * 
 * Использует in-memory хранилище (Map). Для production с несколькими серверами
 * рекомендуется использовать Redis или другую распределённую систему.
 */

// Структура записи в хранилище
type RateLimitRecord = {
  count: number;      // Количество запросов
  firstRequest: number; // Время первого запроса (timestamp)
  blockedUntil?: number; // Время разблокировки (если заблокирован)
};

// Хранилище данных (в памяти)
const store = new Map<string, RateLimitRecord>();

// Конфигурация по умолчанию
export type RateLimitConfig = {
  windowMs: number;    // Временное окно в миллисекундах
  maxRequests: number; // Максимальное количество запросов за окно
  blockDurationMs: number; // Длительность блокировки при превышении
};

// Конфигурация для разных типов запросов
export const RATE_LIMIT_CONFIGS = {
  // Форма обратной связи (заявки)
  request: {
    windowMs: 60 * 1000,        // 1 минута
    maxRequests: 3,             // 3 заявки
    blockDurationMs: 5 * 60 * 1000, // блокировка на 5 минут
  },
  
  // Форма записи на сервис
  appointment: {
    windowMs: 60 * 1000,        // 1 минута
    maxRequests: 5,             // 5 записей
    blockDurationMs: 5 * 60 * 1000, // блокировка на 5 минут
  },
  
  // Форма входа (login)
  login: {
    windowMs: 15 * 60 * 1000,   // 15 минут
    maxRequests: 5,             // 5 попыток
    blockDurationMs: 15 * 60 * 1000, // блокировка на 15 минут
  },
  
  // Форма регистрации
  registration: {
    windowMs: 15 * 60 * 1000,   // 15 минут
    maxRequests: 3,             // 3 попытки
    blockDurationMs: 30 * 60 * 1000, // блокировка на 30 минут
  },
  
  // По умолчанию
  default: {
    windowMs: 60 * 1000,        // 1 минута
    maxRequests: 10,            // 10 запросов
    blockDurationMs: 5 * 60 * 1000, // блокировка на 5 минут
  },
} as const;

/**
 * Очистка старых записей из хранилища
 * Запускается периодически для предотвращения утечек памяти
 */
function cleanupOldRecords() {
  const now = Date.now();
  const maxAge = 60 * 60 * 1000; // 1 час
  
  for (const [key, record] of store.entries()) {
    if (now - record.firstRequest > maxAge) {
      store.delete(key);
    }
  }
}

// Запускаем очистку каждые 10 минут
setInterval(cleanupOldRecords, 10 * 60 * 1000);

/**
 * Проверка rate limit
 * @param identifier - Уникальный идентификатор (IP, email, телефон)
 * @param config - Конфигурация rate limit
 * @returns Объект с результатом проверки
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = RATE_LIMIT_CONFIGS.default
): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfter?: number;
} {
  const now = Date.now();
  const record = store.get(identifier);
  
  // Если записи нет или истекло временное окно
  if (!record || now - record.firstRequest > config.windowMs) {
    // Если была блокировка, проверяем не истекла ли она
    if (record?.blockedUntil && now < record.blockedUntil) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: record.blockedUntil,
        retryAfter: Math.ceil((record.blockedUntil - now) / 1000),
      };
    }
    
    // Создаём новую запись
    store.set(identifier, {
      count: 1,
      firstRequest: now,
    });
    
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt: now + config.windowMs,
    };
  }
  
  // Если заблокирован
  if (record.blockedUntil && now < record.blockedUntil) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.blockedUntil,
      retryAfter: Math.ceil((record.blockedUntil - now) / 1000),
    };
  }
  
  // Увеличиваем счётчик
  record.count++;
  
  // Проверяем превышение лимита
  if (record.count > config.maxRequests) {
    // Блокируем
    record.blockedUntil = now + config.blockDurationMs;
    
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.blockedUntil,
      retryAfter: Math.ceil(config.blockDurationMs / 1000),
    };
  }
  
  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetAt: now + config.windowMs,
  };
}

/**
 * Сброс rate limit для идентификатора
 */
export function resetRateLimit(identifier: string): void {
  store.delete(identifier);
}

/**
 * Получение статистики по идентификатору
 */
export function getRateLimitStats(identifier: string): {
  count: number;
  firstRequest: number;
  blockedUntil?: number;
} | null {
  const record = store.get(identifier);
  if (!record) return null;
  
  return {
    count: record.count,
    firstRequest: record.firstRequest,
    blockedUntil: record.blockedUntil,
  };
}

/**
 * Middleware для Next.js API Routes
 */
export function withRateLimit<T extends { ip?: string; headers?: Headers }>(
  request: T,
  config: RateLimitConfig = RATE_LIMIT_CONFIGS.default,
  identifier?: string
): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfter?: number;
} {
  // Используем переданный identifier или IP из запроса
  const id = identifier || request.ip || 'unknown';
  return checkRateLimit(id, config);
}

/**
 * Получение IP адреса из запроса Next.js
 */
export function getIpAddress(request: Request): string {
  const headers = request.headers;
  
  // Проверяем заголовки прокси
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Fallback
  return 'unknown';
}
