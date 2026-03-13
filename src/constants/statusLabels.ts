import { AppointmentStatus, RequestStatus } from '@/generated/prisma';

export const STATUS_LABEL: Record<RequestStatus, string> = {
  NEW: 'Новые заявки',
  IN_PROGRESS: 'В обработке',
  CALL_CLIENT: 'Звонок',
  DONE: 'Выполненные',
  CALLBACK: 'Не дозвонились (перезвонить)',
  REJECTION: 'Отказ клиента',
  CANCELLED: 'Отменённые / спам',
};

export const APPOINTMENT_STATUS_LABEL: Record<AppointmentStatus, string> = {
  SCHEDULED: 'Запланированные', // запланирована (создана запись, дата ещё не наступила)
  CONFIRMED: 'Подтверждённые', // подтверждена (например, оператор или мастер подтвердил с клиентом)
  IN_PROGRESS: 'В работе', // в работе (машина в работе)
  DONE: 'Выполненные', // выполнена (работы выполнены)
  CANCELLED: 'Отменённые', // отменена клиентом или мастером
};

export const APPOINTMENT_STATUS_COLORS: Record<string, string> = {
  SCHEDULED: '#3B82F6', // синий
  CONFIRMED: '#22C55E', // зелёный
  IN_PROGRESS: '#F59E0B', // жёлтый/оранжевый
  DONE: '#16A34A', // тёмно-зелёный
  CANCELLED: '#EF4444', // красный
};
