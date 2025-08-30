'use server';

import { RequestStatus } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

export async function getRequests() {
  return prisma.request.findMany({
    orderBy: { createdAt: 'asc' },
    include: { client: true },
  });
}

export async function getRequestsByStatus(status: RequestStatus) {
  return prisma.request.findMany({
    where: { status },
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
