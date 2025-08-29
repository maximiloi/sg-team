'use client';

import { logAction } from '@/app/actions/logAction';
import { Check, Hourglass, PhoneCall, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export default function ButtonsAction({
  phone,
  requestId,
  clientId,
}: {
  phone: string;
  requestId: number;
  clientId: string;
}) {
  const [showActions, setShowActions] = useState(false);

  const handleLog = async (action: string) => {
    try {
      await logAction({ action, requestId, clientId });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='mt-4 space-y-2'>
      <Button
        className='w-full'
        onClick={() => {
          handleLog('Позвонить клиенту');
          setShowActions(true);
        }}
        asChild
      >
        <a href={`tel:${phone}`}>
          <PhoneCall /> Позвонить клиенту
        </a>
      </Button>

      {showActions && (
        <div className='flex flex-col gap-2'>
          <Button
            variant='secondary'
            className='w-full'
            onClick={() => handleLog('Отметить выполненной')}
          >
            <Check /> Отметить выполненной
          </Button>
          <Button
            variant='secondary'
            className='w-full'
            onClick={() => handleLog('Отложить')}
          >
            <Hourglass /> Отложить
          </Button>
          <Button
            variant='destructive'
            className='w-full'
            onClick={() => handleLog('Удалить заявку (спам)')}
          >
            <Trash2 />
            Удалить заявку (спам)
          </Button>
        </div>
      )}
    </div>
  );
}
