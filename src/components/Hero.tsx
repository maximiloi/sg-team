import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

import ModalDiagnostics from './modal/ModalDiagnostics';

export default function Hero() {
  return (
    <section className="container mx-auto my-8 max-w-5xl px-4">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="flex-shrink-0">
          <Image
            src="/sgt-logo.jpg"
            alt="SGT Logo"
            width={350}
            height={350}
            className="h-auto w-full max-w-[200px] md:max-w-[350px]"
            priority
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="my-4 scroll-m-20 text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
            Ремонт и ТО автомобилей от&nbsp;30&nbsp;минут с&nbsp;гарантией до&nbsp;12 месяцев в
            Санкт-Петербурге
          </h1>
          <h3 className="my-4 scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 sm:text-2xl">
            Бесплатная диагностика •&nbsp;Гарантия • 15 лет опыта
          </h3>
          <h4 className="my-4 text-gray-600 md:hidden">Витебский проспект 12</h4>
          <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <ModalDiagnostics />
            <Button asChild size="lg" variant="outline">
              <Link href="tel:+79819447077" className="whitespace-nowrap">
                Позвонить: +7 (981) 944-70-77
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
