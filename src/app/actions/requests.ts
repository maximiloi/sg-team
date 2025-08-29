'use server';

import { prisma } from '@/lib/prisma';

export async function getRequests() {
  return prisma.request.findMany({
    orderBy: { createdAt: 'asc' },
    include: { client: true },
  });
}

export async function getRequestById(id: number) {
  return prisma.request.findUnique({
    where: { id },
    include: { client: true },
  });
}
