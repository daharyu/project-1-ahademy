'use client';
import CustomCard from '@/components/customCard/card';
import FooterPage from '@/components/footer/page';
import HeaderSection from '@/components/header/page';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { getAllBookQuery, getBookDetail } from '@/services/book.service';
import { useQuery } from '@tanstack/react-query';
import { Share2, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const formatDate = (entry: string) => {
  const date = new Date(entry);

  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  })
    .format(date)
    .replace('at', ',');

  return formatted;
};

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<Star key={i} size={24} fill='orange' stroke='orange' />);
  }
  return stars;
};

const DetailBook = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBookDetail(id as string),
  });
  const { data: Book, isLoading: isLoadingBook } = useQuery({
    queryKey: ['booksRecommend'],
    queryFn: getAllBookQuery,
  });
  if (isLoading) return null;
  if (isLoadingBook) return null;

  const book = data?.data;
  const allBook = Book?.data.books;
  const similar = book.categoryId;

  const similarBook = allBook.filter(
    (item: any) =>
      Number(item.categoryId) === Number(similar) && item.id !== book.id
  );
  return (
    <>
      <HeaderSection />
      {/* Detail Book */}
      <section className='section mt-20 md:mt-[120px]'>
        <div className='flex flex-col gap-4'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href='/'
                    className='text-sm leading-7 font-semibold tracking-tight text-[#1C65DA]'
                  >
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href='/category'
                    className='text-sm leading-7 font-semibold tracking-tight text-[#1C65DA]'
                  >
                    Category
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className='text-sm leading-7 font-semibold tracking-tight text-neutral-950'>
                  {book.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Detail */}
          <div className='flex flex-col gap-9 md:flex-row'>
            {/* Image Left */}
            {book.coverImage ? (
              <div className='mx-auto h-[328px] w-[222px] object-cover md:mx-0 md:h-[500px] md:w-[337px]'>
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className='w-[222px]md:h-[500px] h-[328px] md:w-[337px]'
                />
              </div>
            ) : (
              <div className='mx-auto flex h-[328px] w-[222px] items-center justify-center bg-gray-200 md:mx-0 md:h-[500px] md:w-[337px] dark:bg-gray-700'>
                <span className='text-xs text-gray-400'>No Cover</span>
              </div>
            )}

            {/* Right */}
            <div className='flex flex-col gap-4 md:my-auto md:w-[827px] md:gap-5'>
              <div className='flex flex-col gap-3 md:gap-[22px]'>
                {/* Title & Badge & Author & Rating */}
                <div className='flex flex-col gap-0.5 md:gap-1'>
                  <p className='w-fit rounded-sm border border-neutral-300 px-2 text-sm leading-7 font-bold tracking-tight'>
                    {book.category.name}
                  </p>
                  <h1 className='text-display-xs md:text-display-sm leading-9 font-bold md:leading-[38px] md:tracking-tight'>
                    {book.title}
                  </h1>
                  <p className='md:text-md text-sm leading-7 font-semibold tracking-tight text-neutral-700 md:leading-[30px]'>
                    {book.author.name}
                  </p>
                  <div className='flex gap-0.5'>
                    <Star size={24} color='transparent' fill='orange' />
                    <p className='text-md leading-[30px] font-bold'>
                      {book.rating}
                    </p>
                  </div>
                </div>

                {/* More Detail */}
                <div className='flex gap-5'>
                  {/* Available */}
                  <div className='flex w-1/3 flex-col md:w-[102px]'>
                    <h6 className='md:text-display-xs text-lg leading-8 font-bold tracking-tighter md:leading-9 md:tracking-normal'>
                      {book.availableCopies}
                    </h6>
                    <p className='md:text-md text-sm leading-7 font-medium tracking-tighter md:leading-[30px]'>
                      Avilable Copies
                    </p>
                  </div>
                  {/* Vertical Separator */}
                  <div className='h-[60px] w-px bg-neutral-300 md:h-[66px]' />
                  {/* Review Count */}
                  <div className='flex w-1/3 flex-col md:w-[102px]'>
                    <h6 className='md:text-display-xs text-lg leading-8 font-bold tracking-tighter md:leading-9 md:tracking-normal'>
                      {book.reviewCount}
                    </h6>
                    <p className='md:text-md text-sm leading-7 font-medium tracking-tighter md:leading-[30px]'>
                      Reviews
                    </p>
                  </div>
                  {/* Vertical Separator */}
                  <div className='h-[60px] w-px bg-neutral-300 md:h-[66px]' />
                  {/* Borrow Count */}
                  <div className='flex w-1/3 flex-col md:w-[102px]'>
                    <h6 className='md:text-display-xs text-lg leading-8 font-bold tracking-tighter md:leading-9 md:tracking-normal'>
                      {book.borrowCount}
                    </h6>
                    <p className='md:text-md text-sm leading-7 font-medium tracking-tighter md:leading-[30px]'>
                      Borrow Count
                    </p>
                  </div>
                </div>

                {/* Horizontal Separator */}
                <hr className='w-full border border-neutral-300 md:w-[560px]' />

                {/* Description */}
                <div className='flex flex-col gap-1'>
                  <h5 className='text-xl leading-[34px] font-bold tracking-tight'>
                    Description
                  </h5>
                  <p className='text-md leading-[30px] font-semibold tracking-tighter'>
                    {book.description}
                  </p>
                </div>

                {/* Button Borrow */}
                <div className='fixed bottom-0 left-1/2 flex w-full -translate-x-1/2 items-center justify-center gap-3 bg-white p-4 shadow-lg shadow-[#CBCACA40] md:relative md:items-start md:justify-start md:p-0 md:shadow-none'>
                  <Button variant='outline' className='w-2/6 md:w-[200px]'>
                    Add to Cart
                  </Button>
                  <Button className='w-2/6 md:w-[200px]'>Borrow Book</Button>
                  <Button variant='outline' className='size-11 rounded-full'>
                    <Share2 size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Separator */}
      <hr className='my-10 w-full border border-neutral-300 md:my-20' />

      {/* Review */}
      <section className='section'>
        {/* Title */}
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='md:text-display-lg gont-bold text-display-xs leading-9'>
            Review
          </h1>
          {/* Rating */}
          <div className='flex gap-1'>
            <Star
              size={34}
              color='transparent'
              fill='orange'
              className='size-6 md:size-[34px]'
            />
            <p className='text-md leading-[30px] font-bold tracking-tight md:text-xl md:leading-[34px] md:tracking-normal'>
              {book.rating} {`(${book.reviewCount} Ulasan)`}
            </p>
          </div>
          {/* Container */}
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {book.reviews.map((review: any, index: number) => (
              <div
                className='flex flex-col gap-4 rounded-2xl p-4 shadow-lg shadow-[#CBCACA40]'
                key={index}
              >
                {/* Profile */}
                <div className='flex gap-3'>
                  <Image
                    src='/images/profile.svg'
                    width={40}
                    height={40}
                    alt={review.user.name}
                    className='size-[58px] rounded-full md:size-16'
                  />
                  <div className='flex flex-col'>
                    <h5 className='text-lg leading-[30px] font-bold tracking-tight'>
                      {review.user.name}
                    </h5>
                    <p className='text-md leading-[30px] font-medium tracking-tighter'>
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Rate and Review */}
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-0.5'>
                    {Array.from({ length: review.star }, (_, i) => (
                      <Star key={i} size={24} fill='orange' stroke='orange' />
                    ))}
                  </div>
                  <p className='text-md leading-[30px] font-semibold tracking-tight'>
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Separator */}
      <hr className='my-10 w-full border border-neutral-300 md:my-20' />

      {/* Similar Book */}
      <section className='section'>
        <h1 className='md:text-display-lg gont-bold text-display-xs leading-9'>
          Related Books
        </h1>
        {/* Container */}
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5'>
          {similarBook.length > 0 ? (
            similarBook.map((book: any, index2: number) => (
              <CustomCard
                key={book.id}
                variant='recommend'
                className='flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg'
                animateIndex={index2 + 1}
                href={`/${book.id}`}
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
                    <div className='flex h-full items-center justify-center bg-gray-200 dark:bg-gray-700'>
                      <span className='text-xs text-gray-400'>No Cover</span>
                    </div>
                  )}
                </div>

                <div className='flex flex-col gap-1 p-3 md:p-4'>
                  <h4 className='line-clamp-2 text-sm leading-tight font-bold md:text-lg'>
                    {book.title}
                  </h4>
                  <p className='text-sm text-gray-600 md:text-base dark:text-gray-400'>
                    {book.author.name}
                  </p>
                  <div className='mt-1 flex items-center gap-1'>
                    <Star size={18} fill='#f59e0b' strokeWidth={0} />
                    <span className='text-sm font-semibold'>{book.rating}</span>
                  </div>
                </div>
              </CustomCard>
            ))
          ) : (
            <p className='col-span-full text-center text-gray-500'>
              No similar books found in this category.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <FooterPage />
    </>
  );
};

export default DetailBook;
