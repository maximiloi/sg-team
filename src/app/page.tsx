import AdvantageList from '@/components/AdvantageList';
import Calls from '@/components/Calls';
import ContactMap from '@/components/ContactMap';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowWeWork from '@/components/HowWeWork';
import PricesBlock from '@/components/PricesBlock';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import WhatWeFix from '@/components/WhatWeFix';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AdvantageList />
        <WhatWeFix />
        <PricesBlock />
        <ReviewsCarousel />
        <Calls />
        <HowWeWork />
        <ContactMap />
      </main>
    </>
  );
}
