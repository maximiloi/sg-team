'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import InputFirstName from '@/components/ui/InputFirstName';
import InputPhoneNumber from '@/components/ui/InputPhoneNumber';

const formSchema = z.object({
  firstName: z
    .string()
    .regex(/^[А-Яа-яA-Za-z]+$/, { message: 'Только буквы' })
    .min(2, { message: 'Минимум 2 буквы' })
    .max(15, { message: 'Очень много букв' }),
  phone: z.string().min(18, { message: 'Укажите номер полностью' }),
});

type FormValues = z.infer<typeof formSchema>;

interface FormTelegramProps {
  onSuccess?: () => void;
}

export default function FormTelegram({ onSuccess }: FormTelegramProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', phone: '' },
  });

  const [submitted, setSubmitted] = useState(false);
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('Ошибка сервера');

      setSubmitted(true);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      // здесь можно добавить toast с ошибкой
    }
  }

  if (submitted) {
    return (
      <div className='p-6 text-center space-y-2 animate-fade-in'>
        <p className='text-lg font-medium'>✅ Спасибо!</p>
        <p className='text-gray-600'>Скоро свяжемся ✨</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <InputFirstName<FormValues> control={form.control} name='firstName' />
        <InputPhoneNumber<FormValues> control={form.control} name='phone' />

        <Button className='w-full' type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : '📩 Отправить заявку'}
        </Button>
      </form>

      <CardFooter>
        <p className='text-sm text-gray-500 text-center mt-2'>
          Номер только для связи. Без спама ✨
        </p>
      </CardFooter>
    </Form>
  );
}
