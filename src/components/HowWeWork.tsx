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
    <section className='container my-8 px-4'>
      <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8'>
        Как мы работаем
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto'>
        {steps.map((step) => (
          <div
            key={step.number}
            className='flex flex-col items-center text-center p-6 border rounded-xl bg-card hover:shadow-md transition-shadow'
          >
            <div className='w-14 h-14 flex items-center justify-center text-3xl bg-primary/10 rounded-full mb-4'>
              <step.icon size={28} strokeWidth={1.8} />
            </div>
            <div className='text-4xl font-bold text-primary/40 mb-2'>
              {step.number}
            </div>
            <h3 className='text-lg font-semibold mb-4'>{step.title}</h3>

            {step.number === 1 && <ModalAppointment />}
          </div>
        ))}
      </div>
    </section>
  );
}
