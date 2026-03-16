import { getActiveAppointments } from '@/actions/appointment';
import { CardAppointment } from '@/components/CardAppointment';
import { Separator } from '@/components/ui/separator';

export default async function ActiveAppointmentsPage() {
  const { today, tomorrow, error } = await getActiveAppointments();

  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Активные записи</h1>

      {/* Записи на сегодня */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Сегодня</h2>
        {today.length === 0 ? (
          <p>Нет записей на сегодня</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {today.map((appointment) => (
              <CardAppointment key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </section>

      <Separator />

      {/* Записи на завтра */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Завтра</h2>
        {tomorrow.length === 0 ? (
          <p>Нет записей на завтра</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {tomorrow.map((appointment) => (
              <CardAppointment key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
