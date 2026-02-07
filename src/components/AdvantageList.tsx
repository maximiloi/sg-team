import Image from 'next/image';
import { Card, CardContent } from './ui/card';

export default function AdvantageList() {
  const advantages = [
    {
      icon: '/advantage_icon_01.svg',
      text: 'Бесплатная диагностика на подъёмнике',
    },
    { icon: '/advantage_icon_02.svg', text: 'Гарантия на работы и запчасти' },
    { icon: '/advantage_icon_03.svg', text: 'Опыт мастеров 15+ лет' },
    { icon: '/advantage_icon_04.svg', text: 'Работаем быстро и честно' },
    { icon: '/advantage_icon_05.svg', text: 'Любые марки авто' },
    { icon: '/advantage_icon_06.svg', text: 'Можно со своими запчастями' },
  ];

  return (
    <section className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 my-6 px-4 md:px-0'>
      {advantages.map((item, i) => (
        <Card
          key={i}
          className='border shadow-sm hover:shadow-md transition-shadow'
        >
          <CardContent className='flex flex-col items-center p-4 sm:p-6 text-center'>
            <Image
              src={item.icon}
              alt=''
              width={64}
              height={64}
              className='mb-3 sm:mb-4'
            />
            <p className='text-sm sm:text-base font-medium leading-tight'>
              {item.text}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
