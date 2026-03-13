import { getAppointmentsByDate } from '@/actions/appointment';
import { CardAppointment } from '@/components/CardAppointment';
import { formatDateForTitleAppointments } from '@/lib/dateUtils';

export default async function AppointmentsByDatePage({
  params,
}: {
  params: { dateKey: string };
}) {
  const { dateKey } = await params;
  const parsedDate = new Date(dateKey);
  const { appointments, error } = await getAppointmentsByDate(parsedDate);

  if (error) {
    return <div className='text-red-500'>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>
        Записи на {formatDateForTitleAppointments(parsedDate)}
      </h1>
      {appointments.length === 0 ? (
        <p>Нет записей на эту дату</p>
      ) : (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4'>
          {appointments.map((appointment) => (
            <CardAppointment key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
}
