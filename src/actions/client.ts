'use server';

import { prisma } from '@/lib/prisma';

export async function getClients() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        cars: true,
      },
    });

    return clients;
  } catch (error) {
    console.error('Ошибка при получении клиентов:', error);
    throw new Error('Не удалось загрузить клиентов');
  }
}

export async function checkClientByPhone({ phone }: { phone: string }) {
  try {
    const client = await prisma.client.findUnique({
      where: { phone },
      select: { firstName: true, lastName: true, telegramId: true },
    });

    return client || null;
  } catch (error) {
    console.error('Error fetching client:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
