'use server';

import { RequestStatus } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { auth } from '../auth/authSetup';

export async function updateRequestStatus(
  requestId: number,
  status: RequestStatus
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Пользователь не авторизован');
  }

  // обновляем заявку
  const updated = await prisma.request.update({
    where: { id: requestId },
    data: {
      status,
      updatedById: session.user.id,
    },
  });

  // пишем в историю
  await prisma.actionLog.create({
    data: {
      action: `Изменение статуса на ${status}`,
      requestId: requestId,
      userId: session.user.id,
    },
  });

  return updated;
}
