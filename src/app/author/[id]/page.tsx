'use client';
import CustomCard from '@/components/customCard/card';
import FooterPage from '@/components/footer/page';
import HeaderSection from '@/components/header/page';
import { getAuthorBook } from '@/services/book.service';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

const AuthorPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['author', id],
    queryFn: () => getAuthorBook(id as string),
  });

  // Loading & Error States
  if (isLoading) {
    return (
      <>
        <HeaderSection />
        <section className='section mt-20 md:mt-[120px]'>
          <div className='py-20 text-center'>
            <p className='text-lg text-gray-500'>Loading author...</p>
          </div>
        </section>
        <FooterPage />
      </>
    );
  }

  if (isError || !data?.data) {
    return (
      <>
        <HeaderSection />
        <section className='section mt-20 md:mt-[120px]'>
          <div className='py-20 text-center'>
            <p className='text-lg text-red-500'>Failed to load author.</p>
          </div>
        </section>
        <FooterPage />
      </>
    );
  }

  const author = data.data; // Now safe to use
  const books = author.books || [];

  return (
    <>
      <HeaderSection />
      <section className='section mt-20 md:mt-[120px]'>
        {/* Author Card */}
        <div className='flex w-full gap-3 rounded-xl p-3 shadow-lg shadow-[#CBCACA40] md:gap-4 md:p-4'>
          <Image
            src='/images/profile.svg'
            width={80}
            height={80}
            alt='author'
            className='size-[60px] rounded-full md:size-[80px]'
          />

          <div className='flex flex-col justify-center gap-0.5'>
            <h6 className='text-md leading-[30px] font-bold tracking-tight md:text-lg md:leading-8 md:tracking-tighter'>
              {author.author.name}
            </h6>
            <div className='flex items-center gap-1.5'>
              <Image src='/images/Book.svg' width={24} height={24} alt='book' />
              <p className='md:text-md text-sm leading-7 font-medium tracking-tighter md:leading-[30px]'>
                {books.length} {books.length === 1 ? 'book' : 'books'}
              </p>
            </div>
          </div>
        </div>

        {/* Book List */}
        <div className='mt-10 flex flex-col gap-4 md:gap-8'>
          <h2 className='text-display-xs md:text-display-lg leading-9 font-bold md:leading-11 md:tracking-tight'>
            Book List
          </h2>

          {books.length === 0 ? (
            <div className='py-20 text-center text-gray-500'>
              <p className='text-lg'>No books found for this author.</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5'>
              {books.map((book: any, index: number) => {
                // calculate avgRating properly
                const avgRating =
                  book.reviewCount > 0
                    ? (book.rating / book.reviewCount).toFixed(1)
                    : '0.0';

                return (
                  <CustomCard
                    key={book.id}
                    variant='recommend'
                    href={`/${book.id}`}
                    animateIndex={index + 1}
                  >
                    <div className='relative aspect-3/4 bg-gray-100'>
                      {book.coverImage ? (
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          className='object-cover'
                          sizes='(max-width: 768px) 50vw, 25vw'
                        />
                      ) : (
                        <div className='flex h-full items-center justify-center bg-gray-200'>
                          <span className='text-xs text-gray-400'>
                            No Cover
                          </span>
                        </div>
                      )}
                    </div>

                    <div className='flex flex-col gap-1 p-4'>
                      <h4 className='line-clamp-2 text-sm font-bold md:text-lg'>
                        {book.title}
                      </h4>
                      <p className='text-sm text-gray-600'>
                        {author.author.name}
                      </p>
                      <div className='mt-2 flex items-center gap-1'>
                        <Star size={18} fill='#f59e0b' strokeWidth={0} />
                        <span className='text-sm font-semibold'>
                          {avgRating}
                        </span>
                      </div>
                    </div>
                  </CustomCard>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <FooterPage />
    </>
  );
};

export default AuthorPage;
