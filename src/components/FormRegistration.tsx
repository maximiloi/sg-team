'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// ✅ схема валидации с zod
const schema = z
  .object({
    login: z.string().min(3, 'Логин должен содержать минимум 3 символа'),
    password: z
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
      .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function FormRegistration({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log('Форма отправлена:', data);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Регистрация</CardTitle>
          <CardDescription>
            Создайте новый аккаунт, указав логин и пароль
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              {/* ЛОГИН */}
              <div className='grid gap-2'>
                <Label htmlFor='login'>Логин</Label>
                <Input id='login' type='text' {...register('login')} />
                {errors.login && (
                  <p className='text-sm text-red-500'>{errors.login.message}</p>
                )}
              </div>

              {/* ПАРОЛЬ */}
              <div className='grid gap-2'>
                <Label htmlFor='password'>Пароль</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500'
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
                <p className='text-xs text-gray-500'>
                  Пароль должен быть не короче 6 символов, содержать хотя бы
                  одну цифру и заглавную букву.
                </p>
              </div>

              {/* ПОВТОР ПАРОЛЯ */}
              <div className='grid gap-2'>
                <Label htmlFor='confirmPassword'>Повтор пароля</Label>
                <Input
                  id='confirmPassword'
                  type={showPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className='text-sm text-red-500'>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* КНОПКА */}
              <Button type='submit' className='w-full'>
                Зарегистрироваться
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
