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
    .regex(/^[А-Яа-яA-Za-z]+$/, { message: 'Можно вводить только буквы 😊' })
    .min(2, { message: 'Имя должно содержать хотя бы 2 буквы 😊' }),
  phone: z
    .string()
    .min(18, { message: 'Укажите номер в формате +7 (999) 123-45-67' }),
});

type FormValues = {
  firstName: string;
  phone: string;
};

export default function FormTelegram() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', phone: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) setSubmitted(true);
      else console.error(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className='p-6 text-center space-y-2 animate-fade-in'>
        <p className='text-lg font-medium'>✅ Спасибо!</p>
        <p className='text-gray-600'>Мы свяжемся с вами в ближайшее время ✨</p>
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
        <p className='text-sm text-gray-500 text-center'>
          Мы используем номер только для связи. Никакого спама ✨
        </p>
      </CardFooter>
    </Form>
  );
}
