import { MapPin, Phone } from 'lucide-react';
import ModalCallBack from './modal/ModalCallBack';

export default function Calls() {
  return (
    <section className='container my-8 px-4 flex flex-col gap-4 items-center justify-center text-center'>
      <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8'>
        Проблема с авто или просто ТО?
      </h2>
      <p>
        Не рискуйте — приезжайте сегодня! Бесплатно поднимем на подъёмник и
        скажем, что сломалось.
      </p>
      <div className='flex items-center flex-col md:flex-row gap-6 text-sm font-medium'>
        <span className='flex items-center gap-2'>
          <a
            href='tel:+79819447077'
            className='flex items-center gap-2 hover:text-primary'
          >
            <Phone size={18} /> +7 (981) 944-70-77
          </a>
        </span>
        <span className='flex items-center gap-2'>
          <MapPin size={16} /> Санкт-Петербург, Витебский проспект, 12
        </span>
      </div>

      <ModalCallBack />
    </section>
  );
}
