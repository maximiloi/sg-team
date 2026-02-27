import { MapPin, Phone } from 'lucide-react';
import ModalCallBack from './modal/ModalCallBack';

export default function Calls() {
  return (
    <section className="container mx-auto my-8 max-w-5xl px-4 text-center">
      <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
        Проблема с авто или просто ТО?
      </h2>
      <p className="text-base sm:text-lg">
        Не рискуйте — приезжайте сегодня! Бесплатно поднимем на подъёмник и скажем, что сломалось.
      </p>
      <div className="flex flex-col flex-wrap items-center justify-center gap-4 text-sm font-medium sm:text-base md:flex-row">
        <span className="flex items-center gap-2">
          <a
            href="tel:+79819447077"
            className="hover:text-primary flex items-center gap-2 whitespace-nowrap"
          >
            <Phone size={18} /> +7 (981) 944-70-77
          </a>
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <MapPin className="flex-shrink-0" size={16} />{' '}
          <span>Санкт-Петербург, Витебский проспект, 12</span>
        </span>
      </div>

      <ModalCallBack />
    </section>
  );
}
