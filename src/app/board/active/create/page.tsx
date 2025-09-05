'use client';

import { createAppointment } from '@/actions/appointment';
import { checkClientByPhone } from '@/actions/client';
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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { ru } from 'date-fns/locale';
import { ChevronDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import vinDecoder from 'vin-decode';
import z from 'zod';

const schema = z.object({
  phone: z
    .string()
    .min(18, { message: 'Укажите номер в формате +7 (999) 123-45-67' }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  telegramId: z.string().optional(),
  vin: z.string().optional(),
  plate: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  date: z.string().min(1, 'Укажите дату'),
  time: z.string().min(1, 'Укажите время'),
  type: z.enum(['MAINTENANCE', 'DIAGNOSTICS', 'REPAIR']),
  comment: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function FormAppointment() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: '',
      firstName: '',
      lastName: '',
      telegramId: '',
      vin: '',
      plate: '',
      make: '',
      model: '',
      date: '',
      time: '10:00',
      type: 'MAINTENANCE',
      comment: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    watch,
  } = methods;

  const onSubmit = async (data: FormValues) => {
    const result = await createAppointment(data);
    if (result.success) {
      console.log('🚀 ~ onSubmit ~ appointment created:', result.appointment);
      // Здесь можно добавить уведомление об успехе, например, toast
      router.push('/board/active');
    } else {
      console.error('🚀 ~ onSubmit ~ error:', result.error);
      // Здесь можно добавить уведомление об ошибке
    }
  };

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
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-2xl shadow'
      >
        <h2 className='text-xl font-bold'>Создать запись</h2>

        <div>
          <FormField
            control={control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Controller
                    name='phone'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <IMaskInput
                        value={value}
                        onAccept={(value) => {
                          onChange(value);
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
                    )}
                  />
                </FormControl>
                <FormMessage className='mb-2' />
              </FormItem>
            )}
          />
          <Input
            placeholder='Имя'
            {...register('firstName')}
            className='mb-2'
          />
          <Input
            placeholder='Фамилия'
            {...register('lastName')}
            className='mb-2'
          />
          <Input placeholder='Telegram ID' {...register('telegramId')} />
        </div>

        <Separator />

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
          <Input
            placeholder='Госномер'
            {...register('plate')}
            className='mb-2'
          />
        </div>

        <Separator />

        {/* Дата и время */}
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

        {/* Тип записи */}
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

        {/* Комментарий */}
        <div>
          <label className='block mb-1'>Комментарий</label>
          <Textarea {...register('comment')} placeholder='Доп. информация...' />
        </div>

        <Button type='submit' className='w-full'>
          Создать
        </Button>
      </form>
    </FormProvider>
  );
}
