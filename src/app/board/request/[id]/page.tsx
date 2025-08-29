import { getRequestById } from '@/app/actions/requests';
import ButtonsAction from '@/components/ButtonsAction';
import { Card, CardContent } from '@/components/ui/card';

export default async function RequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = await getRequestById(Number(id));

  if (!request) {
    return <p>Заявка не найдена</p>;
  }

  return (
    <div className='p-4'>
      <Card>
        <CardContent className='space-y-2 p-4'>
          <h1 className='text-2xl font-bold mb-4'>Заявка #{request.id}</h1>
          <div>
            <strong>Клиент:</strong> {request.client.firstName}{' '}
            {request.client.lastName ?? ''}
          </div>
          <div>
            <strong>Телефон:</strong> {request.client.phone}
          </div>
          <div>
            <strong>Дата и время создания:</strong>{' '}
            {new Date(request.createdAt).toLocaleString()}
          </div>
          <ButtonsAction
            phone={request.client.phone}
            requestId={Number(request.id)}
            clientId={request.client.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
