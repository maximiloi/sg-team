'use client';

import { createAppointment } from '@/actions/appointment';
import FormAppointmentDateTime from '@/components/FormAppointmentDateTime';
import FormAppointmentPersonalInfo from '@/components/FormAppointmentPersonalInfo';
import FormAppointmentType from '@/components/FormAppointmentType';
import FormAppointmentVehicleInfo from '@/components/FormAppointmentVehicleInfo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { appointmentSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = appointmentSchema.extend({
  firstName: appointmentSchema.shape.firstName,
  lastName: appointmentSchema.shape.lastName,
  telegramId: appointmentSchema.shape.telegramId,
  vin: appointmentSchema.shape.vin,
  plate: appointmentSchema.shape.plate,
  make: appointmentSchema.shape.make,
  model: appointmentSchema.shape.model,
  comment: z.string().max(1000, 'Комментарий слишком длинный').optional().or(z.literal('')),
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

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: FormValues) => {
    // Проверяем ошибки валидации формы перед отправкой
    if (formState.errors.phone) {
      toast.error(`Телефон: ${formState.errors.phone.message}`);
      return;
    }
    if (formState.errors.date) {
      toast.error(`Дата: ${formState.errors.date.message}`);
      return;
    }
    if (formState.errors.time) {
      toast.error(`Время: ${formState.errors.time.message}`);
      return;
    }
    if (formState.errors.vin && data.vin) {
      toast.error(`VIN: ${formState.errors.vin.message}`);
      return;
    }
    if (formState.errors.plate && data.plate) {
      toast.error(`Госномер: ${formState.errors.plate.message}`);
      return;
    }

    const result = await createAppointment(data);

    if (result.success) {
      toast.success('Запись успешно создана');
      router.push('/board/active');
    } else {
      // Показываем конкретные ошибки валидации
      if (result.details && Array.isArray(result.details)) {
        const errorMessages = result.details
          .map((d: { field: string; message: string }) => `• ${d.message}`)
          .join('\n');
        toast.error(`Ошибка валидации:\n${errorMessages}`, {
          duration: 5000,
        });
      } else {
        toast.error(result.error || 'Не удалось создать запись');
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl space-y-6 rounded-2xl bg-white p-6 shadow"
      >
        <h2 className="text-xl font-bold">Создать запись</h2>
        <FormAppointmentPersonalInfo />
        <Separator />
        <FormAppointmentVehicleInfo />
        <Separator />
        <FormAppointmentDateTime />
        <Separator />
        <FormAppointmentType />
        <div>
          <label className="mb-1 block">Комментарий</label>
          <Textarea {...methods.register('comment')} placeholder="Доп. информация..." />
        </div>
        <Button type="submit" className="w-full">
          Создать
        </Button>
      </form>
    </FormProvider>
  );
}
