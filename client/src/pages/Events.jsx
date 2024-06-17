import React from 'react';
import HeroEvent2 from '../components/EventHeroTwo';
import HeroEvent1 from '../components/EventHeroOne';
import Hero from '../components/EventHero';
import Footer from '../components/Footer';
import '../index.css';

const Events = () => {
  return (
    <>
      <div className='flex-col gap-6'>
        <Hero />
        <HeroEvent1 />
        <HeroEvent2 />
        <HeroEvent1 />
        <Footer />
      </div>
    </>
  );
};

export default Events;
