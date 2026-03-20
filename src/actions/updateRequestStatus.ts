'use server';

import { RequestStatus } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { sanitizeString, updateRequestStatusSchema } from '@/lib/validations';
import { auth } from '../app/auth/authSetup';

export async function updateRequestStatus(requestId: number, status: RequestStatus) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Пользователь не авторизован');
  }

  // Валидация входных данных
  const validation = updateRequestStatusSchema.safeParse({ requestId, status });

  if (!validation.success) {
    const errors = validation.error.issues.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    console.error('[updateRequestStatus] Validation error:', errors);
    throw new Error('Ошибка валидации данных');
  }

  // Проверяем существование заявки
  const existingRequest = await prisma.request.findUnique({
    where: { id: requestId },
    select: { id: true, status: true },
  });

  if (!existingRequest) {
    throw new Error(`Заявка #${requestId} не найдена`);
  }

  // Обновляем заявку
  const updated = await prisma.request.update({
    where: { id: requestId },
    data: {
      status,
      updatedById: session.user.id,
    },
  });

  // Пишем в историю
  const sanitizedAction = sanitizeString(`Изменение статуса на ${status}`);
  await prisma.actionLog.create({
    data: {
      action: sanitizedAction,
      requestId: requestId,
      userId: session.user.id,
    },
  });

  return updated;
}
