'use client';

import { MapPin, Phone } from 'lucide-react';

import FormTelegram from '@/components/FormTelegram';

export default function ContactMap() {
  return (
    <section className="container mx-auto my-12 max-w-5xl px-4">
      <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">Запишитесь прямо сейчас</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Карта + контакты */}
        <div className="space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-xl border shadow-sm">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3AВАШ_КОНСТРУКТОР_ID&lang=ru_RU&scroll=true"
              width="100%"
              height="100%"
              frameBorder="0"
              className="h-full w-full"
            />
          </div>

          <div className="flex flex-col gap-4 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 text-base sm:text-lg md:justify-start">
              <MapPin className="text-primary flex-shrink-0" size={24} />
              <span>Витебский пр., 12, Санкт-Петербург</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-base sm:text-lg md:justify-start">
              <Phone className="text-primary flex-shrink-0" size={24} />
              <a href="tel:+79819447077" className="hover:text-primary whitespace-nowrap">
                +7 (981) 944-70-77
              </a>
            </div>
          </div>
        </div>

        {/* Форма */}
        <div className="bg-card w-full rounded-xl border p-6 shadow-sm">
          <FormTelegram showQuestion={true} buttonText="Задать вопрос" />
        </div>
      </div>
    </section>
  );
}
