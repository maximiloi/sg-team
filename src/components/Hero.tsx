import Link from 'next/link';
import { Button } from './ui/button';

import ModalDiagnostics from './modal/ModalDiagnostics';

export default function Hero() {
  return (
    <section className='mx-4 my-8'>
      <h1 className='my-8 scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance'>
        Ремонт и ТО автомобилей от&nbsp;30&nbsp;минут с&nbsp;гарантией
        до&nbsp;12 месяцев в Санкт-Петербурге
      </h1>
      <h3 className='my-4 scroll-m-20 text-2xl text-center font-semibold tracking-tight first:mt-0'>
        Бесплатная диагностика •&nbsp;Гарантия • 15 лет опыта
      </h3>
      <h4 className='my-4 text-center text-gray-600'>Витебский проспект 12</h4>
      <div className='flex flex-col justify-center gap-4'>
        <ModalDiagnostics />
        <Button asChild size='lg' variant='outline'>
          <Link href='tel:+79819447077'>Позвонить: +7 (981) 944-70-77</Link>
        </Button>
      </div>
    </section>
  );
}
