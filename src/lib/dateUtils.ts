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
    { locale: ru },
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

/**
 * Форматирует телефон из БД (только цифры) в красивый формат
 * @param phone - номер телефона (например, '79817197800')
 * @returns отформатированный номер (+7 (981) 719-78-00)
 */
export function formatPhone(phone: string): string {
  // Удаляем все нецифровые символы
  const digits = phone.replace(/\D/g, '');

  // Если номер начинается с 8, заменяем на 7
  const normalized = digits.startsWith('8') ? '7' + digits.slice(1) : digits;

  // Проверяем длину (должно быть 11 цифр для российского номера)
  if (normalized.length !== 11 || normalized[0] !== '7') {
    return phone; // Возвращаем как есть, если не российский номер
  }

  // Форматируем: +7 (XXX) XXX-XX-XX
  return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7, 9)}-${normalized.slice(9, 11)}`;
}
