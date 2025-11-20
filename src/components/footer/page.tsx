import Image from 'next/image';
import React from 'react';

const FooterPage = () => {
  return (
    <>
      <footer className='mt-10 flex w-full flex-col items-center justify-between border-t border-neutral-300 px-4 py-10 text-center md:mt-20 md:px-[150px] md:py-20'>
        <div className='flex flex-col gap-4 md:gap-10'>
          {/* Upper */}
          <div className='flex flex-col gap-4 text-center md:gap-[22px]'>
            {/* LOGO */}
            <div className='mx-auto flex gap-[15px]'>
              <Image
                src='/images/logo.svg'
                width={40}
                height={40}
                alt='logo'
                className='h-[40px] w-[40px] md:h-[42px] md:w-[42px]'
              />
              <h3 className='text-display-md leading-[42px] font-bold'>
                Booky
              </h3>
            </div>

            <p className='md:tex-md text-sm leading-7 font-semibold tracking-tight md:leading-[30px]'>
              Discover inspiring stories & timeless knowledge, ready to borrow
              anytime. Explore online or visit our nearest library branch.
            </p>
          </div>

          {/* Lower */}
          <div className='mx-auto flex w-[196px] flex-col gap-5'>
            <p className='text-md text-center leading-[30px] font-bold tracking-tight md:tracking-normal'>
              Follow on Social Media
            </p>
            {/* Social Media */}
            <div className='flex gap-3'>
              {[1, 2, 3, 4].map((item) => (
                <div
                  className='flex size-10 items-center justify-center rounded-full border border-neutral-300'
                  key={item}
                >
                  <Image
                    src={`/images/sosmed${item}.svg`}
                    width={20}
                    height={20}
                    alt={`sosmed${item}`}
                    className='h-[20px] w-[20px]'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterPage;
