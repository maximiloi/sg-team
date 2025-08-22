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
      <div
        className='fixed top--5 left-1 -translate-x-1/4 -translate-y-1/4'
        style={{
          width: '290vw', // шире экрана, чтобы компенсировать поворот
          height: '210vh', // выше экрана
          backgroundImage: "url('/logo.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '250px 250px',
          transform: 'rotate(-45deg)',
          transformOrigin: 'center center',
          zIndex: 0,
          position: 'fixed',
        }}
      />
      <Card className='w-full max-w-[22rem] relative z-10'>
        <CardHeader>
          <CardTitle className='text-3xl'>Мы обновляемся для вас!</CardTitle>
          <CardDescription className='text-lg'>
            Заполните форму, и мы обязательно вам перезвоним!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormTelegram />
        </CardContent>
      </Card>
    </main>
  );
}
