'use server';

import { prisma } from '@/lib/prisma';
import { LogActionInput, logActionSchema, sanitizeString } from '@/lib/validations';
import { auth } from '../app/auth/authSetup';

export async function logAction({
  action,
  requestId,
  clientId,
}: {
  action: string;
  requestId: number;
  clientId?: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Пользователь не авторизован');
  }

  // Валидация входных данных
  const validation = logActionSchema.safeParse({ action, requestId, clientId });

  if (!validation.success) {
    const errors = validation.error.issues.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    console.error('[logAction] Validation error:', errors);
    throw new Error('Ошибка валидации данных');
  }

  const data: LogActionInput = validation.data;

  // Проверяем существование заявки
  const existingRequest = await prisma.request.findUnique({
    where: { id: requestId },
    select: { id: true },
  });

  if (!existingRequest) {
    throw new Error(`Заявка #${requestId} не найдена`);
  }

  // Санитизация действия
  const sanitizedAction = sanitizeString(data.action);

  await prisma.actionLog.create({
    data: {
      action: sanitizedAction,
      requestId,
      ...(clientId !== undefined && { clientId }),
      userId: session.user.id,
    },
  });
}
