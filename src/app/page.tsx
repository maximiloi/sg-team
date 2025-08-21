import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex items-center justify-center  min-h-screen'>
      <Image
        src='/logo.png'
        alt='Super Garage Team логотип'
        width={350}
        height={350}
        priority
      />
    </main>
  );
}
