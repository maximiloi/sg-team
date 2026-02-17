import AdvantageList from '@/components/AdvantageList';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PricesBlock from '@/components/PricesBlock';
import WhatWeFix from '@/components/WhatWeFix';

export default function Home() {
  return (
    <>
      <Header />
      <main className='md:flex md:items-center md:justify-center md:flex-col'>
        <Hero />
        <AdvantageList />
        <WhatWeFix />
        <PricesBlock />
      </main>
    </>
  );
}
