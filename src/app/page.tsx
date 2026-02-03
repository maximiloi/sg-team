import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <>
      <Header />
      <main className='md:flex md:items-center md:justify-center'>
        <Hero />
      </main>
    </>
  );
}
