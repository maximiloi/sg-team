import { Calendar, HandCoins, Search, Wrench } from 'lucide-react';
import ModalAppointment from './modal/ModalAppointment';

export default function HowWeWork() {
  const steps = [
    { number: 1, title: 'Запись', icon: Calendar },
    { number: 2, title: 'Бесплатная диагностика', icon: Search },
    { number: 3, title: 'Согласование стоимости', icon: HandCoins },
    { number: 4, title: 'Ремонт + гарантия', icon: Wrench },
  ];

  return (
    <section className="container mx-auto my-8 max-w-5xl px-4">
      <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">Как мы работаем</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-card flex flex-col items-center rounded-xl border p-6 text-center transition-shadow hover:shadow-md"
          >
            <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-full text-3xl">
              <step.icon size={28} strokeWidth={1.8} />
            </div>
            <div className="text-primary/40 mb-2 text-4xl font-bold">{step.number}</div>
            <h3 className="mb-4 text-lg font-semibold">{step.title}</h3>

            {step.number === 1 && <ModalAppointment />}
          </div>
        ))}
      </div>
    </section>
  );
}
