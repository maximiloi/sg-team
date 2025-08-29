'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '../auth/authSetup';

export async function logAction({
  action,
  requestId,
  clientId,
}: {
  action: string;
  requestId?: number;
  clientId?: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Пользователь не авторизован');
  }

  await prisma.actionLog.create({
    data: {
      action,
      requestId,
      clientId,
      userId: session.user.id,
    },
  });
}
