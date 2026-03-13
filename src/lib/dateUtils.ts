import { format, parse, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

// Форматирование даты и времени для базы данных
export function formatDateForDB(date: string, time: string): string {
  // Если дата уже в ISO-формате, парсим её
  const parsedDate = date.includes('T')
    ? parseISO(date)
    : parse(date, 'yyyy-MM-dd', new Date(), { locale: ru });
  // Парсим время
  const dateTime = parse(
    `${format(parsedDate, 'yyyy-MM-dd')} ${time}`,
    'yyyy-MM-dd HH:mm',
    new Date(),
    { locale: ru }
  );
  return dateTime.toISOString();
}

// Форматирование даты из базы для отображения времени в карточке
export function formatDateForCardAppointments(date: Date): string {
  return format(date, 'HH:mm', { locale: ru });
}

// Форматирование даты из базы для отображения в заголовке
export function formatDateForTitleAppointments(date: Date): string {
  return format(date, 'dd/MM/yyyy', { locale: ru });
}

// Форматирование даты из базы для отображения в заголовке
export function formatDateForCreateAppointment(date: Date): string {
  return format(date, 'dd/MM HH:mm', { locale: ru });
}
