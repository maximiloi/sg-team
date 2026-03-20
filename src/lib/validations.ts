import { z } from 'zod';

// -----------------------------------------------------------------------------
// Общие regex паттерны
// -----------------------------------------------------------------------------

export const PHONE_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
export const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/i; // VIN без I, O, Q (17 символов)
export const PLATE_REGEX = /^[А-ВЕКМНОРСТУХ]\d{3}[А-ВЕКМНОРСТУХ]{2}\d{2,3}$/i; // Российский госномер
export const NAME_REGEX = /^[А-Яа-яA-Za-z]+$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// -----------------------------------------------------------------------------
// Заявка на обратный звонок (API /api/clients)
// -----------------------------------------------------------------------------

export const requestSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя слишком длинное')
    .regex(NAME_REGEX, 'Имя должно содержать только буквы'),

  phone: z
    .string()
    .regex(PHONE_REGEX, 'Некорректный формат телефона. Используйте: +7 (XXX) XXX-XX-XX')
    .transform((val) => val.replace(/\D/g, '')), // Удаляем всё кроме цифр

  question: z
    .string()
    .max(1000, 'Вопрос слишком длинный (макс. 1000 символов)')
    .optional()
    .transform((val) => val?.trim() || null),
});

export type RequestInput = z.infer<typeof requestSchema>;

// -----------------------------------------------------------------------------
// Запись на сервис (Server Action)
// -----------------------------------------------------------------------------

export const appointmentSchema = z.object({
  phone: z
    .string()
    .min(18, 'Телефон должен быть в формате +7 (XXX) XXX-XX-XX')
    .regex(PHONE_REGEX, 'Некорректный формат телефона'),

  firstName: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя слишком длинное')
    .regex(NAME_REGEX, 'Имя должно содержать только буквы')
    .optional()
    .or(z.literal('')),

  lastName: z
    .string()
    .max(50, 'Фамилия слишком длинная')
    .regex(NAME_REGEX, 'Фамилия должна содержать только буквы')
    .optional()
    .or(z.literal('')),

  telegramId: z.string().max(50, 'Telegram ID слишком длинный').optional().or(z.literal('')),

  vin: z
    .string()
    .length(17, 'VIN должен содержать 17 символов')
    .regex(VIN_REGEX, 'Некорректный VIN (недопустимые символы)')
    .optional()
    .or(z.literal('')),

  plate: z
    .string()
    .max(20, 'Госномер слишком длинный')
    .regex(PLATE_REGEX, 'Некорректный госномер')
    .optional()
    .or(z.literal('')),

  make: z.string().max(50, 'Марка слишком длинная').optional().or(z.literal('')),

  model: z.string().max(50, 'Модель слишком длинная').optional().or(z.literal('')),

  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Некорректная дата'),

  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Некорректное время (формат ЧЧ:ММ)'),

  type: z.enum(['MAINTENANCE', 'DIAGNOSTICS', 'REPAIR']),

  comment: z
    .string()
    .max(1000, 'Комментарий слишком длинный (макс. 1000 символов)')
    .optional()
    .or(z.literal('')),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

// -----------------------------------------------------------------------------
// Регистрация пользователя
// -----------------------------------------------------------------------------

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Имя должно содержать минимум 2 символа')
      .max(50, 'Имя слишком длинное')
      .regex(NAME_REGEX, 'Имя должно содержать только буквы'),

    email: z.string().email('Некорректный email').regex(EMAIL_REGEX, 'Некорректный email'),

    password: z
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
      .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type SignupInput = z.infer<typeof signupSchema>;

// -----------------------------------------------------------------------------
// Обновление статуса заявки
// -----------------------------------------------------------------------------

export const updateRequestStatusSchema = z.object({
  requestId: z.number().int().positive('ID заявки должен быть положительным числом'),
  status: z.enum([
    'NEW',
    'IN_PROGRESS',
    'CALL_CLIENT',
    'DONE',
    'CALLBACK',
    'REJECTION',
    'CANCELLED',
  ]),
});

export type UpdateRequestStatusInput = z.infer<typeof updateRequestStatusSchema>;

// -----------------------------------------------------------------------------
// Логирование действий
// -----------------------------------------------------------------------------

export const logActionSchema = z.object({
  action: z
    .string()
    .min(1, 'Действие не может быть пустым')
    .max(200, 'Описание действия слишком длинное')
    .transform((val) => val.trim()),

  requestId: z.number().int().positive('ID заявки должен быть положительным числом'),

  clientId: z.string().uuid('Некорректный ID клиента').optional(),
});

export type LogActionInput = z.infer<typeof logActionSchema>;

// -----------------------------------------------------------------------------
// Утилиты для санитизации
// -----------------------------------------------------------------------------

/**
 * Санитизирует строку: удаляет leading/trailing пробелы и экранирует HTML
 */
export function sanitizeString(str: string | null | undefined): string {
  if (!str) return '';

  return str
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Валидирует и санитизирует данные через Zod схему
 * @throws {z.ZodError} Если валидация не пройдена
 */
export function validateData<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  return schema.parse(data);
}

/**
 * Валидирует и санитизирует данные через Zod схему (без ошибок, возвращает null)
 */
export function safeValidateData<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> | null {
  const result = schema.safeParse(data);
  return result.success ? result.data : null;
}

/**
 * Форматирует ошибки Zod для отображения
 */
export function formatZodErrors(error: z.ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));
}
