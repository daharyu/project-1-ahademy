'use client';
import FooterPage from '@/components/footer/page';
import HeaderSection from '@/components/header/page';
import { useState } from 'react';
import MePage from './me/page';
import BorrowedPage from './borrowed/page';

const myProfile = () => {
  const [selected, setSelected] = useState('profile');

  return (
    <>
      <HeaderSection />
      <section className='section mt-20 md:mt-[120px]'>
        <div className='flex h-14 w-full gap-2 rounded-2xl bg-[#F5F5F5] p-2 md:w-[557px]'>
          <div
            className={`flex w-1/3 cursor-pointer items-center justify-center rounded-xl px-3 py-2 ${selected === 'profile' && 'bg-white shadow-lg shadow-[#CBCACA40]'} `}
            onClick={() => setSelected('profile')}
          >
            <p
              className={`md:text-md text-center text-sm leading-7 font-bold tracking-tighter md:leading-[30px] md:tracking-tight ${selected !== 'profile' && 'text-neutral-600'} `}
            >
              Profile
            </p>
          </div>
          <div
            className={`flex w-1/3 cursor-pointer items-center justify-center rounded-xl px-3 py-2 ${selected === 'borrowed' && 'bg-white shadow-lg shadow-[#CBCACA40]'} `}
            onClick={() => setSelected('borrowed')}
          >
            <p
              className={`md:text-md text-center text-sm leading-7 font-bold tracking-tighter md:leading-[30px] md:tracking-tight ${selected !== 'borrowed' && 'text-neutral-600'} `}
            >
              Borrowed List
            </p>
          </div>
          <div
            className={`flex w-1/3 cursor-pointer items-center justify-center rounded-xl px-3 py-2 ${selected === 'review' && 'bg-white shadow-lg shadow-[#CBCACA40]'} `}
            onClick={() => setSelected('review')}
          >
            <p
              className={`md:text-md text-center text-sm leading-7 font-bold tracking-tighter md:leading-[30px] md:tracking-tight ${selected !== 'review' && 'text-neutral-600'} `}
            >
              Review
            </p>
          </div>
        </div>

        {selected === 'profile' && <MePage />}
        {selected === 'borrowed' && <BorrowedPage />}
      </section>
      <FooterPage />
    </>
  );
};

export default myProfile;
