'use client';

import Header from '@/components/_mainpage/header';
import Preview from '@/components/_mainpage/preview';
import Chart from '@/components/_mainpage/chart';
import Footer from '@/components/_mainpage/footer';
import MySection from '@/components/_mainpage/mySection';
import Support from '@/components/support';

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
        <MySection />
      </div>
      <div>
        <Support />
        <Footer />
      </div>
    </>
  );
}
