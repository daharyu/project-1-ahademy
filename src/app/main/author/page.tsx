'use client';
import { getAuthor, getAuthorBook } from '@/services/book.service';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

type AuthorRes = {
  id: number;
  name: string;
};

const AuthorByID = ({ id }: { id: number }) => {
  const { data: jumData, isLoading: loading } = useQuery({
    queryKey: ['author', id],
    queryFn: () => getAuthorBook(id),
  });

  if (loading) return 0;
  if (!jumData?.data) return 'No data';

  const sumBook = jumData.data.books.length;
  return sumBook;
};

const AuthorSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['authors'],
    queryFn: getAuthor,
  });

  const authors = data?.data.authors ?? [];
  return (
    <>
      <section className='section mt-10'>
        <h1 className='text-display-xs md:text-display-lg mb-6 font-bold'>
          Popular Authors
        </h1>

        {/* Container */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5'>
          {authors.map((author: AuthorRes) => (
            <Link href={`/author/${author.id}`} key={author.id}>
              <div className='flex w-full gap-3 rounded-xl p-3 shadow-lg shadow-[#CBCACA40] md:gap-4 md:p-4'>
                <Image
                  src='/images/profile.svg'
                  width={40}
                  height={40}
                  alt='author'
                  className='size-[60px] rounded-full md:size-[80px]'
                />
                {/* Text */}
                <div className='flex flex-col gap-0.5'>
                  <h6 className='text-md leading-[30px] font-bold tracking-tight md:text-lg md:leading-8 md:tracking-tighter'>
                    {author.name}
                  </h6>
                  <div className='flex gap-1.5'>
                    <Image
                      src='/images/Book.svg'
                      width={24}
                      height={24}
                      alt='book'
                    />
                    <p className='md:text-md text-sm leading-7 font-medium tracking-tighter md:leading-[30px]'>
                      <AuthorByID id={author.id} /> books
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default AuthorSection;
