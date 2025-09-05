'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import vinDecoder from 'vin-decode';

export default function FormAppointmentVehicleInfo() {
  const { control, setValue, register } = useFormContext();

  const handleVinChange = (vin: string) => {
    if (vin && vin.length === 17) {
      const result = vinDecoder(vin).decode();
      if (result) {
        setValue('make', result.manufacturer);
        setValue('model', result.details);
      }
    }
  };

  return (
    <div>
      <h3 className='font-medium mb-2'>Автомобиль</h3>
      <FormField
        control={control}
        name='vin'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder='VIN'
                {...field}
                onChange={(e) => {
                  const upperCaseValue = e.target.value.toUpperCase();
                  field.onChange(upperCaseValue);
                  handleVinChange(upperCaseValue);
                }}
                className='mb-2'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Input placeholder='Марка' {...register('make')} className='mb-2' />
      <Input placeholder='Модель' {...register('model')} className='mb-2' />
      <Input placeholder='Госномер' {...register('plate')} className='mb-2' />
    </div>
  );
}
