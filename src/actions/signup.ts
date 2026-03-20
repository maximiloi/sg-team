'use server';

import { prisma } from '@/lib/prisma';
import { sanitizeString, SignupInput, signupSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';

export async function signupAction(rawData: unknown) {
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
