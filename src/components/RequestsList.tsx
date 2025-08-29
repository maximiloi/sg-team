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

export default function RequestsList({ requests }: { requests: Request[] }) {
  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>Новые заявки</h1>
      <Carousel>
        <CarouselContent>
          {requests.map((req: Request) => (
            <CarouselItem
              key={req.id}
              className='md:basis-1/2 lg:basis-1/3 basis-[80%] pl-4'
            >
              <Link href={`/board/request/${req.id}`}>
                <Card
                  className='py-2'
                  style={{
                    backgroundImage:
                      'linear-gradient(to top, rgba(0, 210, 252, 0.3), transparent)',
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
