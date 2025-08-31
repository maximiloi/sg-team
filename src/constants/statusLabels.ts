import { RequestStatus } from '@/generated/prisma';

export const STATUS_LABEL: Record<RequestStatus, string> = {
  NEW: 'Новые заявки',
  IN_PROGRESS: 'В обработке',
  POSTPONED: 'Отложенные',
  CONFIRMED: 'Подтверждённые',
  DONE: 'Выполненные',
  CANCELLED: 'Отменённые',
};
