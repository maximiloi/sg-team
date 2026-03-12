'use client';

import { Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const reviews = [
  {
    name: 'Павел Ч.',
    text: 'Отличный сервис! Работают настоящие спецы. Могут решить любой вопрос по ремонту авто. Я доволен',
    rating: 5,
    source: 'Яндекс',
    date: '6 февраля 2026',
    avatar: undefined,
  },
  {
    name: 'Аня И.',
    text: 'Отличный, надежный сервис. Ребята профессионалы своего дела. Быстро устранили неполадки в короткие сроки. Тормоза работают исправно, нет больше люфта в руле, машина едет уверенно. Спасибо.',
    rating: 5,
    source: 'Яндекс',
    date: '13 февраля 2026',
    avatar: undefined,
  },
  {
    name: 'Дмитрий',
    text: 'Заезжал переварить гофру на глушителе. Всё сделали быстро и по делу. Показали проблему, сразу озвучили цену — без всяких накруток. По времени недолго, по деньгам вполне адекватно. Сейчас машина работает тихо, ничего не сечет. Спасибо за нормальный подход 👍',
    rating: 5,
    source: 'Avito',
    date: '14 февраля 2025',
    avatar: undefined,
  },
  {
    name: 'Елисей',
    text: 'Все отлично, Рекомендую!',
    rating: 5,
    source: 'Авито',
    date: '10 декабря 2024',
    avatar: undefined,
  },
  {
    name: 'Ольга В.',
    text: 'Ребята - профи! Подробно и доступно объясняют проблему, подбирают качественные запчасти, все работы согласовывают.',
    rating: 5,
    source: 'Яндекс',
    date: '24 апреля 2025',
    avatar: undefined,
  },
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
                    <AvatarImage src={review?.avatar} alt={review.name} />
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

        <CarouselPrevious className="hidden sm:-left-12 sm:flex" />
        <CarouselNext className="hidden sm:-right-12 sm:flex" />
      </Carousel>
    </section>
  );
}
