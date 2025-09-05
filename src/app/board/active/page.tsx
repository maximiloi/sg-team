import { getActiveAppointments } from '@/actions/appointment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDateForDisplay } from '@/lib/dateUtils';

export default async function ActiveAppointmentsPage() {
  const { today, tomorrow, error } = await getActiveAppointments();

  if (error) {
    return <div className='text-red-500'>Ошибка: {error}</div>;
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Активные записи</h1>

      {/* Записи на сегодня */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Сегодня</h2>
        {today.length === 0 ? (
          <p>Нет записей на сегодня</p>
        ) : (
          <div className='grid gap-4'>
            {today.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader>
                  <CardTitle>
                    {formatDateForDisplay(appointment.date)} -{' '}
                    {appointment.type === 'MAINTENANCE'
                      ? 'Техобслуживание'
                      : appointment.type === 'DIAGNOSTICS'
                      ? 'Диагностика'
                      : 'Ремонт'}
                  </CardTitle>
                </CardHeader>
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
          <div className='grid gap-4'>
            {tomorrow.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader>
                  <CardTitle>
                    {formatDateForDisplay(appointment.date)} -{' '}
                    {appointment.type === 'MAINTENANCE'
                      ? 'Техобслуживание'
                      : appointment.type === 'DIAGNOSTICS'
                      ? 'Диагностика'
                      : 'Ремонт'}
                  </CardTitle>
                </CardHeader>
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
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
