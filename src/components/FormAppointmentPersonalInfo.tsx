'use client';

import { checkClientByPhone } from '@/actions/client';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

export default function FormAppointmentPersonalInfo() {
  const { control, setValue, register } = useFormContext();

  const handlePhoneChange = async (phone: string) => {
    if (phone && phone.length === 18) {
      const client = await checkClientByPhone({ phone });
      if (client) {
        setValue('firstName', client.firstName);
        setValue('lastName', client.lastName || '');
        setValue('telegramId', client.telegramId || '');
      }
    }
  };

  return (
    <div>
      <FormField
        control={control}
        name='phone'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <IMaskInput
                value={field.value}
                onAccept={(value) => {
                  field.onChange(value);
                  handlePhoneChange(value);
                }}
                mask='+7 (000) 000-00-00'
                placeholder={'+7 (000) 000-00-00'}
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm mb-2
                  ring-offset-background placeholder:text-muted-foreground 
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                inputMode='tel'
                type='tel'
              />
            </FormControl>
            <FormMessage className='mb-2' />
          </FormItem>
        )}
      />
      <Input placeholder='Имя' {...register('firstName')} className='mb-2' />
      <Input placeholder='Фамилия' {...register('lastName')} className='mb-2' />
      <Input placeholder='Telegram ID' {...register('telegramId')} />
    </div>
  );
}
