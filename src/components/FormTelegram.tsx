'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import InputFirstName from '@/components/ui/InputFirstName';
import InputPhoneNumber from '@/components/ui/InputPhoneNumber';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  firstName: z
    .string()
    .regex(/^[А-Яа-яA-Za-z]+$/, { message: 'Только буквы' })
    .min(2, { message: 'Минимум 2 буквы' })
    .max(15, { message: 'Очень много букв' }),
  phone: z.string().min(18, { message: 'Укажите номер полностью' }),
  question: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface FormTelegramProps {
  onSuccess?: () => void;
  buttonText?: string;
  showQuestion?: boolean;
}

export default function FormTelegram({
  onSuccess,
  buttonText = '📩 Отправить заявку',
  showQuestion = false,
}: FormTelegramProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', phone: '', question: '' },
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
    }
  }

  if (submitted) {
    return (
      <div className="animate-fade-in space-y-2 p-6 text-center">
        <p className="text-lg font-medium">✅ Спасибо!</p>
        <p className="text-gray-600">Скоро свяжемся ✨</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputFirstName<FormValues> control={form.control} name="firstName" />
        <InputPhoneNumber<FormValues> control={form.control} name="phone" />

        {showQuestion && (
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ваш вопрос / что беспокоит?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Опишите проблему кратко..."
                    className="min-h-[80px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : buttonText}
        </Button>
      </form>

      <CardFooter className="justify-center">
        <p className="mt-2 block text-sm text-gray-500">Номер только для связи. Без спама ✨</p>
      </CardFooter>
    </Form>
  );
}
