'use client';

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
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useTransition } from 'react';

export default function FormLogin({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [isPending, startTransition] = useTransition();

  async function handleLogin(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/board',
    });
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Войти</CardTitle>
          <CardDescription>
            Введите свой е-мейл и пароль для входа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={(formData) => startTransition(() => handleLogin(formData))}
          >
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input name='email' type='email' required />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='password'>Пароль</Label>
                <Input name='password' type='password' required />
              </div>
              <div className='flex flex-col gap-3'>
                <Button
                  type='submit'
                  className='w-full cursor-pointer'
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Входим...
                    </>
                  ) : (
                    'Войти'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
