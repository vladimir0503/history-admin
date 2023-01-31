import React from 'react';
import Header from '../../components/Header';
import Admin from '../../features/admin/component/Admin';
import Price from '../../features/price/component/Price';
import Reviews from '../../features/reviews/components/Reviews';
import Slider from '../../features/slider/component/Slider';

import './Main.scss';

const Main = () => {
  return (
    <>
      <Header />
      <div className='main'>
        <Admin />
        <Price />
        <Slider />
        <Reviews />
      </div>
    </>
  );
};

export default Main;