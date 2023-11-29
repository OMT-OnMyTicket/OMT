'use client';

import Header from '@/components/_mainpage/header';
import Preview from '@/components/_mainpage/preview';
import Chart from '@/components/_mainpage/chart';
import Footer from '@/components/_mainpage/footer';
import Support from '@/components/support';
import Price from '@/components/_mainpage/price';
import Event from '@/components/_mainpage/event';

export default function Home() {
  return (
    <>
      <div className=''>
        <Header />
      </div>
      <div>
        <Preview />
      </div>
      <div>
        <Chart />
      </div>
      <div>
        <Event />
      </div>
      <div>
        <Price />
      </div>
      <div>
        <Support />
        <Footer />
      </div>
    </>
  );
}
