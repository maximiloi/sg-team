'use server';

import { prisma } from '@/lib/prisma';
import { checkRateLimit, RATE_LIMIT_CONFIGS } from '@/lib/rateLimit';
import { sanitizeString, SignupInput, signupSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';

export async function signupAction(rawData: unknown) {
  // Получаем IP для rate limiting
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';

  // Rate limiting по IP
  const rateLimitResult = checkRateLimit(`signup:${ip}`, RATE_LIMIT_CONFIGS.registration);

  if (!rateLimitResult.allowed) {
    console.warn(`[signupAction] Rate limit exceeded for IP: ${ip}`);
    throw new Error(
      `Слишком много попыток регистрации. Попробуйте через ${Math.ceil(rateLimitResult.retryAfter! / 60)} мин.`,
    );
  }

  // Валидация входных данных на сервере
  const validation = signupSchema.safeParse(rawData);

  if (!validation.success) {
    const errors = validation.error.issues.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    console.error('[signupAction] Validation error:', errors);
    throw new Error('Ошибка валидации данных');
  }

  const data: SignupInput = validation.data;

  // Санитизация входных данных
  const sanitizedName = sanitizeString(data.name);
  const sanitizedEmail = data.email.toLowerCase().trim();

  // Проверка на существующего пользователя
  const existing = await prisma.user.findUnique({
    where: { email: sanitizedEmail },
  });

  if (existing) {
    throw new Error('Email уже зарегистрирован');
  }

  // Хеширование пароля
  const hashed = await bcrypt.hash(data.password, 12);

  // Создание пользователя
  await prisma.user.create({
    data: {
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashed,
    },
  });
}
