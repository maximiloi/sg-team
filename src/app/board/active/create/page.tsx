'use client';

import { createAppointment } from '@/actions/appointment';
import FormAppointmentDateTime from '@/components/FormAppointmentDateTime';
import FormAppointmentPersonalInfo from '@/components/FormAppointmentPersonalInfo';
import FormAppointmentType from '@/components/FormAppointmentType';
import FormAppointmentVehicleInfo from '@/components/FormAppointmentVehicleInfo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
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

  const { handleSubmit } = methods;

  const onSubmit = async (data: FormValues) => {
    const result = await createAppointment(data);
    if (result.success) {
      toast.success('Запись успешно создана');
      router.push('/board/active');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-2xl shadow'
      >
        <h2 className='text-xl font-bold'>Создать запись</h2>
        <FormAppointmentPersonalInfo />
        <Separator />
        <FormAppointmentVehicleInfo />
        <Separator />
        <FormAppointmentDateTime />
        <Separator />
        <FormAppointmentType />
        <div>
          <label className='block mb-1'>Комментарий</label>
          <Textarea
            {...methods.register('comment')}
            placeholder='Доп. информация...'
          />
        </div>
        <Button type='submit' className='w-full'>
          Создать
        </Button>
      </form>
    </FormProvider>
  );
}
