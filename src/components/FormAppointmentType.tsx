'use client';

import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

export default function FormAppointmentType() {
  const { setValue, watch } = useFormContext();

  return (
    <div>
      <label className='block mb-1'>Вид работы</label>
      <div className='grid gap-2'>
        <Button
          type='button'
          variant={watch('type') === 'MAINTENANCE' ? 'default' : 'outline'}
          onClick={() => setValue('type', 'MAINTENANCE')}
        >
          Техобслуживание
        </Button>
        <Button
          type='button'
          variant={watch('type') === 'DIAGNOSTICS' ? 'default' : 'outline'}
          onClick={() => setValue('type', 'DIAGNOSTICS')}
        >
          Диагностика
        </Button>
        <Button
          type='button'
          variant={watch('type') === 'REPAIR' ? 'default' : 'outline'}
          onClick={() => setValue('type', 'REPAIR')}
        >
          Ремонт
        </Button>
      </div>
    </div>
  );
}
