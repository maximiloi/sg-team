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
    <section className="container mx-auto my-8 px-4">
      <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">Что говорят клиенты</h2>

      <Carousel opts={{ align: 'start', loop: true }} className="mx-auto w-full max-w-5xl">
        <CarouselContent>
          {reviews.map((review, i) => (
            <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="bg-card flex h-full flex-col rounded-xl border p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{review.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {review.source} • {review.date}
                    </p>
                  </div>
                </div>

                <div className="mb-3 flex">
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        className={
                          idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
                        }
                      />
                    ))}
                </div>

                <p className="flex-1 text-sm leading-relaxed">«{review.text}»</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:-left-12 sm:block" />
        <CarouselNext className="hidden sm:-right-12 sm:block" />
      </Carousel>
    </section>
  );
}
