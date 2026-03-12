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
    <section className="container mx-auto my-8 grid max-w-5xl grid-cols-2 gap-4 px-4 md:grid-cols-3 md:gap-6">
      {advantages.map((item, i) => (
        <Card key={i} className="border shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col items-center p-4 text-center sm:p-6">
            <Image src={item.icon} alt="" width={64} height={64} className="mb-3 sm:mb-4" />
            <p className="text-sm leading-tight font-medium sm:text-base">{item.text}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
