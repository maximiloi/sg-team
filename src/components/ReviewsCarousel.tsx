'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Алексей М.',
    text: 'Быстро нашли причину с выхлопом. Подъёмник бесплатно — респект! Рекомендую.',
    rating: 5,
    source: 'Яндекс',
    date: '15 февраля 2026',
    avatar: '/placeholder.svg',
  },
  {
    name: 'Марина К.',
    text: 'Тормоза скрипели ужасно. Сделали за день, объяснили всё по-человечески. 5 звёзд!',
    rating: 5,
    source: 'Avito',
    date: '3 января 2026',
    avatar: '/placeholder-user.jpg',
  },
  {
    name: 'Дмитрий С.',
    text: 'Приехал по объявлению с Авито. Качественно, недорого, без навязывания лишнего.',
    rating: 5,
    source: 'Avito',
    date: '19 декабря 2025',
  },
  // добавляйте свои реальные отзывы и фото
];

export default function ReviewsCarousel() {
  return (
    <section className='container my-8 px-4'>
      <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8'>
        Что говорят клиенты
      </h2>

      <Carousel
        opts={{ align: 'start', loop: true }}
        className='w-full max-w-5xl mx-auto'
      >
        <CarouselContent>
          {reviews.map((review, i) => (
            <CarouselItem key={i} className='md:basis-1/2 lg:basis-1/3 pl-4'>
              <div className='bg-card border rounded-xl p-6 h-full flex flex-col'>
                <div className='flex items-center gap-3 mb-4'>
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium'>{review.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {review.source} • {review.date}
                    </p>
                  </div>
                </div>

                <div className='flex mb-3'>
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        className={
                          idx < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted'
                        }
                      />
                    ))}
                </div>

                <p className='text-sm leading-relaxed flex-1'>
                  «{review.text}»
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className='-left-2 sm:-left-12' />
        <CarouselNext className='-right-2 sm:-right-12' />
      </Carousel>
    </section>
  );
}
