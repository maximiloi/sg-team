import { RequestStatus } from '@/generated/prisma';

export const STATUS_LABEL: Record<RequestStatus, string> = {
  NEW: 'Новые заявки',
  IN_PROGRESS: 'В обработке',
  CALL_CLIENT: 'Звонок',
  DONE: 'Выполненные',
  CALLBACK: 'Не дозвонились (перезвонить)',
  REJECTION: 'Отказ клиента',
  CANCELLED: 'Отменённые / спам',
};
