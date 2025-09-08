import { getActiveAppointments } from '@/actions/appointment';
import { CardAppointment } from '@/components/CardAppointment';
import { Separator } from '@/components/ui/separator';

export default async function ActiveAppointmentsPage() {
  const { today, tomorrow, error } = await getActiveAppointments();

  if (error) {
    return <div className='text-red-500'>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Активные записи</h1>

      {/* Записи на сегодня */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Сегодня</h2>
        {today.length === 0 ? (
          <p>Нет записей на сегодня</p>
        ) : (
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4'>
            {today.map((appointment) => (
              <CardAppointment key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </section>

      <Separator />

      {/* Записи на завтра */}
      <section className='mt-8'>
        <h2 className='text-xl font-semibold mb-4'>Завтра</h2>
        {tomorrow.length === 0 ? (
          <p>Нет записей на завтра</p>
        ) : (
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4'>
            {tomorrow.map((appointment) => (
              <CardAppointment key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
