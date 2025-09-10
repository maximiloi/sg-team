import { getAppointmentById } from '@/actions/appointment';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  APPOINTMENT_STATUS_COLORS,
  APPOINTMENT_STATUS_LABEL,
} from '@/constants/statusLabels';
import { formatDateForCreateAppointment } from '@/lib/dateUtils';

export default async function AppointmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { appointment, error } = await getAppointmentById(id);

  if (error || !appointment) {
    return <div className='text-red-500'>Ошибка: Запись не найдена</div>;
  }

  return (
    <>
      <h1 className='text-2xl font-bold mb-6'>Детали записи</h1>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>
              {formatDateForCreateAppointment(appointment.date)} -{' '}
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
        </CardHeader>
        <CardContent>
          {appointment.comment && (
            <p>
              <strong>Комментарий:</strong> {appointment.comment}
            </p>
          )}
          <Separator className='my-4' />
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
        </CardContent>
        <CardFooter className='gap-4 text-gray-300'>
          <p>
            <strong>Дата создания:</strong>{' '}
            {formatDateForCreateAppointment(appointment.createdAt)}
          </p>
          <p>
            <strong>ID записи:</strong> {appointment.id}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
