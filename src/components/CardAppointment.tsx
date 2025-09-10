import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  APPOINTMENT_STATUS_COLORS,
  APPOINTMENT_STATUS_LABEL,
} from '@/constants/statusLabels';
import { Appointment } from '@/generated/prisma';
import { formatDateForCardAppointments } from '@/lib/dateUtils';
import Link from 'next/link';

// Расширяем тип Appointment, добавляя связанные данные client и car
type AppointmentWithRelations = Appointment & {
  client: {
    firstName: string;
    lastName?: string | null;
    phone: string;
  };
  car?: {
    make: string;
    model: string;
    plate: string;
  } | null;
};

export function CardAppointment({
  appointment,
}: {
  appointment: AppointmentWithRelations;
}) {
  return (
    <Card>
      <Link href={`/board/appointment/${appointment.id}`}>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>
              {formatDateForCardAppointments(appointment.date)} -{' '}
              {appointment.type === 'MAINTENANCE'
                ? 'Техобслуживание'
                : appointment.type === 'DIAGNOSTICS'
                ? 'Диагностика'
                : 'Ремонт'}
            </CardTitle>
            <Badge
              style={{
                backgroundColor: APPOINTMENT_STATUS_COLORS[appointment.status],
                color: '#fff',
              }}
            >
              {APPOINTMENT_STATUS_LABEL[appointment.status]}
            </Badge>
          </div>
        </CardHeader>
      </Link>
      <CardContent>
        <p>
          <strong>Клиент:</strong> {appointment.client.firstName}{' '}
          {appointment.client.lastName || ''} (
          <a
            href={`tel:${appointment.client.phone}`}
            className='text-blue-500 hover:underline'
          >
            {appointment.client.phone}
          </a>
          )
        </p>
        {appointment.car && (
          <>
            <p>
              <strong>Автомобиль:</strong> {appointment.car.make}{' '}
              {appointment.car.model}
            </p>
            {appointment.car.plate !== 'Не указано' && (
              <p>
                <strong>Госномер:</strong> {appointment.car.plate}
              </p>
            )}
          </>
        )}
        {appointment.comment && (
          <p>
            <strong>Комментарий:</strong> {appointment.comment}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
