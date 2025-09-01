'use client';

import { updateRequestStatus } from '@/app/actions/updateRequestStatus';
import { RequestStatus } from '@/generated/prisma';
import {
  CalendarCheck2,
  CheckCircle2,
  Clock,
  PhoneCall,
  Trash2,
} from 'lucide-react';
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
  const [showActions, setShowActions] = useState(
    currentStatus !== RequestStatus.NEW
  );

  const handleStatusChange = async (status: RequestStatus) => {
    try {
      await updateRequestStatus(requestId, status);

      if (
        currentStatus === RequestStatus.NEW &&
        status === RequestStatus.IN_PROGRESS
      ) {
        setShowActions(true);
      }
    } catch (e) {
      console.error('Ошибка при изменении статуса', e);
    }
  };

  return (
    <div className='mt-4 flex flex-col gap-2'>
      <Button
        className='w-full'
        asChild
        onClick={() => {
          handleStatusChange(RequestStatus.IN_PROGRESS);
        }}
      >
        <a href={`tel:${phone.replace(/\D/g, '')}`}>
          <PhoneCall className='mr-2' /> Позвонить клиенту
        </a>
      </Button>

      {showActions && (
        <>
          <Button
            variant='secondary'
            className='w-full'
            onClick={() => handleStatusChange(RequestStatus.CONFIRMED)}
          >
            <CalendarCheck2 className='mr-2' /> Подтвердить запись
          </Button>

          <Button
            variant='secondary'
            className='w-full'
            onClick={() => handleStatusChange(RequestStatus.POSTPONED)}
          >
            <Clock className='mr-2' /> Отложить
          </Button>

          <Button
            variant='secondary'
            className='w-full'
            onClick={() => handleStatusChange(RequestStatus.DONE)}
          >
            <CheckCircle2 className='mr-2' /> Отметить выполненной
          </Button>

          <Button
            variant='destructive'
            className='w-full'
            onClick={() => handleStatusChange(RequestStatus.CANCELLED)}
          >
            <Trash2 className='mr-2' /> Удалить заявку (спам)
          </Button>
        </>
      )}
    </div>
  );
}
