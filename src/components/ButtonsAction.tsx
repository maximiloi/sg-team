'use client';

import { updateRequestStatus } from '@/app/actions/updateRequestStatus';
import { RequestStatus } from '@/generated/prisma';
import {
  AlarmClock,
  Briefcase,
  PhoneCall,
  Trash2,
  XCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';

export default function ButtonsAction({
  phone,
  requestId,
  currentStatus,
}: {
  phone: string;
  requestId: number;
  currentStatus: RequestStatus;
}) {
  const [status, setStatus] = useState<RequestStatus>(currentStatus);
  const router = useRouter();

  const handleStatusChange = async (
    newStatus: RequestStatus,
    redirect?: boolean
  ) => {
    try {
      await updateRequestStatus(requestId, newStatus);
      setStatus(newStatus);

      if (
        newStatus === RequestStatus.REJECTION ||
        newStatus === RequestStatus.CANCELLED
      ) {
        router.push('/board'); // редирект на доску
      } else if (redirect) {
        router.refresh();
      }
    } catch (e) {
      console.error('Ошибка при изменении статуса', e);
    }
  };

  return (
    <div className='mt-4 flex flex-col gap-2'>
      <Button
        className='w-full'
        onClick={async () => {
          try {
            await handleStatusChange(RequestStatus.CALL_CLIENT, false);
            await handleStatusChange(RequestStatus.IN_PROGRESS, true);
            window.location.href = `tel:${phone.replace(/\D/g, '')}`;
          } catch (e) {
            console.error('Ошибка при звонке клиенту', e);
          }
        }}
      >
        <PhoneCall className='mr-2' /> Позвонить клиенту
      </Button>

      {status !== RequestStatus.NEW && (
        <>
          <Button
            variant='secondary'
            className='w-full'
            onClick={() => handleStatusChange(RequestStatus.DONE, true)}
          >
            <Briefcase className='mr-2' /> Передать в работу
          </Button>

          <Button
            variant='secondary'
            className='w-full'
            onClick={() => handleStatusChange(RequestStatus.CALLBACK, true)}
          >
            <AlarmClock className='mr-2' /> Не дозвонились
          </Button>

          <Button
            variant='secondary'
            className='w-full'
            onClick={() => handleStatusChange(RequestStatus.REJECTION, true)}
          >
            <XCircle className='mr-2' /> Отказ клиента
          </Button>

          <Button
            variant='destructive'
            className='w-full'
            onClick={() => handleStatusChange(RequestStatus.CANCELLED, true)}
          >
            <Trash2 className='mr-2' /> Удалить заявку (спам)
          </Button>
        </>
      )}
    </div>
  );
}
