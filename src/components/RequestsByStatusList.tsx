import { RequestStatus } from '@/generated/prisma';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

type Client = {
  firstName: string;
  lastName?: string | null;
  phone: string;
};

type Request = {
  id: number;
  createdAt: Date;
  client: Client;
};

export default function RequestsByStatusList({
  status,
  requests,
}: {
  status: RequestStatus;
  requests: Request[];
}) {
  if (requests.length === 0) return null;

  return (
    <>
      <h2 className='text-xl font-semibold mt-8 mb-4'>{statusLabel[status]}</h2>
      <Carousel>
        <CarouselContent>
          {requests.map((req) => (
            <CarouselItem
              key={req.id}
              className='md:basis-1/2 lg:basis-1/3 basis-[80%] pl-4'
            >
              <Link href={`/board/request/${req.id}`}>
                <Card
                  className='py-2'
                  style={{
                    backgroundImage:
                      'linear-gradient(to top, rgba(0, 210, 252, 0.15), transparent)',
                  }}
                >
                  <CardContent className='px-4'>
                    <div>
                      <strong>Клиент:</strong> {req.client.firstName}{' '}
                      {req.client.lastName ?? ''}
                    </div>
                    <div>
                      <strong>Телефон:</strong> {req.client.phone}
                    </div>
                    <div>
                      <strong>Дата и время:</strong>{' '}
                      {new Date(req.createdAt).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}

const statusLabel: Record<RequestStatus, string> = {
  NEW: 'Новые заявки',
  IN_PROGRESS: 'В обработке',
  POSTPONED: 'Отложенные',
  CONFIRMED: 'Подтверждённые',
  DONE: 'Выполненные',
  CANCELLED: 'Отменённые',
};
