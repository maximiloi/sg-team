import FormTelegram from '@/components/components/FormTelegram';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <main className='flex items-center justify-center min-h-screen'>
      <Card className='w-full max-w-[22rem]'>
        <CardHeader>
          <CardTitle className='text-3xl'>Мы обновляемся для вас!</CardTitle>
          <CardDescription className='text-lg'>
            Остались вопросы? Заполните форму, и мы обязательно вам перезвоним!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormTelegram />
        </CardContent>
      </Card>
    </main>
  );
}
