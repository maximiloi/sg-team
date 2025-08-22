'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { CardFooter } from '../ui/card';

const formSchema = z.object({
  username: z
    .string()
    .regex(/^[А-Яа-яA-Za-z]+$/, { message: 'Можно вводить только буквы 😊' })
    .min(2, { message: 'Имя должно содержать хотя бы 2 буквы 😊' }),
  phone: z
    .string()
    .min(18, { message: 'Укажите номер в формате +7 (999) 123-45-67' }),
});

export default function FormTelegram() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      phone: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        console.error(errorData);
      }
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
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Как к вам обращаться?</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Иван'
                  onChange={(e) => {
                    // оставляем только буквы (русские и латинские)
                    const value = e.target.value.replace(
                      /[^А-Яа-яA-Za-z]/g,
                      ''
                    );
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={() => (
            <FormItem>
              <FormLabel>Ваш номер телефона</FormLabel>
              <FormControl>
                <Controller
                  name='phone'
                  control={form.control}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask='+7 (000) 000-00-00'
                      placeholder='+7 (___) ___-__-__'
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                      inputMode='tel'
                      type='tel'
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='w-full' type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : '📩 Отправить заявку'}
        </Button>

        <CardFooter>
          <p className='text-sm text-gray-500 text-center'>
            Мы используем номер только для связи. Никакого спама ✨
          </p>
        </CardFooter>
      </form>
    </Form>
  );
}
