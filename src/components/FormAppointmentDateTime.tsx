'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@radix-ui/react-label';
import { ru } from 'date-fns/locale';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function FormAppointmentDateTime() {
  const { control, setValue } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <div className='flex gap-4'>
      <FormField
        control={control}
        name='date'
        render={({ field }) => (
          <FormItem>
            <Label className='px-1'>Запись на дату</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    className='w-42 justify-between font-normal'
                  >
                    {field.value
                      ? new Date(field.value).toLocaleDateString()
                      : 'Выберите дату'}
                    <ChevronDownIcon />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className='w-auto overflow-hidden p-0'
                align='start'
              >
                <Calendar
                  locale={ru}
                  mode='single'
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      setValue('date', selectedDate.toISOString());
                      setOpen(false);
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='time'
        render={({ field }) => (
          <FormItem>
            <Label className='px-1'>Время</Label>
            <FormControl>
              <Input
                type='time'
                {...field}
                className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
