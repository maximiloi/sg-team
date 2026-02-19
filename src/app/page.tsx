import AdvantageList from '@/components/AdvantageList';
import Calls from '@/components/Calls';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PricesBlock from '@/components/PricesBlock';
import ReviewsCarousel from '@/components/ReviewsCarousel';
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
        <ReviewsCarousel />
        <Calls />
      </main>
    </>
  );
}
