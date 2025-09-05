import type { Metadata } from 'next';
import { Inter, Rubik } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['cyrillic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sgt-service.ru'),
  title: 'Автосервис - Super Garage Team | TO за час',
  description:
    'Профессиональный автосервис Super Garage Team. Ремонт и обслуживание автомобилей любых марок в короткие сроки с гарантией качества. ТО за час',
  keywords: [
    'автосервис',
    'ремонт авто',
    'СТО',
    'автомастерская',
    'Super Garage Team',
    'обслуживание автомобилей',
    'диагностика авто',
    'ремонт двигателя',
    'замена масла',
    'шиномонтаж',
  ],
  authors: [{ name: 'Super Garage Team', url: 'https://sgt-service.ru' }],
  creator: 'Super Garage Team',
  publisher: 'Super Garage Team',
  applicationName: 'Super Garage Team',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Автосервис - Super Garage Team',
    description:
      'Надёжный автосервис с гарантией качества. Ремонт и обслуживание автомобилей любых марок.',
    url: 'https://sgt-service.ru',
    siteName: 'Super Garage Team',
    images: [
      {
        url: '/logo.png', // сюда лучше положить картинку в public/
        width: 250,
        height: 250,
        alt: 'Super Garage Team - автосервис',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Автосервис - Super Garage Team',
    description:
      'Профессиональный ремонт и обслуживание автомобилей. Super Garage Team.',
    images: ['/logo.png'],
  },
  category: 'Автосервис',
  alternates: {
    canonical: 'https://sgt-service.ru',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body className={`${inter.variable} ${rubik.variable} antialiased`}>
        {children}
        <Toaster richColors position='top-right' />
      </body>
    </html>
  );
}
