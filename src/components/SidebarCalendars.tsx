'use client';

import { getAppointmentsForCalendar } from '@/actions/appointment';
import { CalendarAppointment } from '@/components/ui/calendarAppointment';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';

export default function SidebarCalendars() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<
    { id: string; date: Date; status: string }[]
  >([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const startDate = startOfMonth(new Date());
      const endDate = endOfMonth(new Date());
      const { appointments, error } = await getAppointmentsForCalendar(
        startDate,
        endDate
      );
      if (!error) {
        setAppointments(appointments);
      }
    };
    fetchAppointments();
  }, []);

  const appointmentsByDate = useMemo(() => {
    const map = new Map<string, string[]>();
    const currentDate = new Date();
    appointments.forEach((appointment) => {
      const startDate = new Date(appointment.date);
      if (appointment.status === 'IN_PROGRESS') {
        // Для IN_PROGRESS добавляем статус для всех дней от appointment.date до текущей даты
        const days = eachDayOfInterval({
          start: startDate,
          end: currentDate,
        });
        days.forEach((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const statuses = map.get(dateKey) || [];
          statuses.push(appointment.status);
          map.set(dateKey, statuses);
        });
      } else if (
        appointment.status !== 'DONE' &&
        appointment.status !== 'CANCELLED'
      ) {
        // Для других активных статусов (SCHEDULED, CONFIRMED) добавляем только на дату записи
        const dateKey = format(startDate, 'yyyy-MM-dd');
        const statuses = map.get(dateKey) || [];
        statuses.push(appointment.status);
        map.set(dateKey, statuses);
      }
    });
    return map;
  }, [appointments]);

  return (
    <CalendarAppointment
      mode='single'
      selected={date}
      onSelect={setDate}
      locale={ru}
      className='rounded-lg border'
      appointmentsByDate={appointmentsByDate}
    />
  );
}
