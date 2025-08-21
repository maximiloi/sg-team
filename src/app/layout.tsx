import type { Metadata } from 'next';
import { Inter, Rubik } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['cyrillic'],
});

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: 'Автосервис - Super Garage Team',
  description: 'Автосервис команды Super Garage Team',
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
      </body>
    </html>
  );
}
