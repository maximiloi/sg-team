'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useActionState } from 'react';

export default function FormLogin({ className, ...props }: React.ComponentProps<'div'>) {
  async function handleLogin(_: unknown, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      email,
      password,
      redirectTo: '/board',
      redirect: false,
    });

    if (result?.error) {
      console.error('[Login] Error:', result.error);
      return { error: 'Неверный email или пароль' };
    }
    return null;
  }

  const [state, formAction] = useActionState(handleLogin, null);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Войти</CardTitle>
          <CardDescription>Введите свой е-мейл и пароль для входа</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Пароль</Label>
                </div>
                <Input name="password" type="password" required />
              </div>
              {state?.error && (
                <div className="text-sm text-red-500">{state.error}</div>
              )}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Войти
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
