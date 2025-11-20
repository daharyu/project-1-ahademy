'use client';

import CustomCard from '@/components/customCard/card';
import { Button } from '@/components/ui/button';
import { getAllBooks } from '@/services/book.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import { useGenreStore } from '@/hook/genreStore';

const RecommendSection = () => {
  const { selectedGenreId, selectedGenreName } = useGenreStore();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['books'],
    queryFn: ({ pageParam = 1 }) => getAllBooks(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination || {};
      return page < totalPages ? page + 1 : undefined;
    },
  });

  const allBooks = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.books) ?? [];
  }, [data]);

  const filteredBooks = useMemo(() => {
    if (!selectedGenreId) return allBooks;
    return allBooks.filter(
      (book: any) => String(book.categoryId) === String(selectedGenreId)
    );
  }, [allBooks, selectedGenreId]);

  const title = selectedGenreId
    ? `${selectedGenreName || 'Category'} Books`
    : 'Recommendation';

  if (isLoading) {
    return (
      <section className='section mt-10'>
        <h1 className='text-display-xs md:text-display-lg mb-8 font-bold'>
          {title}
        </h1>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className='aspect-3/4 animate-pulse rounded-xl bg-gray-200'
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className='py-10 text-center text-red-500'>Failed to load books</div>
    );
  }

  // Empty state when genre selected but no books
  if (selectedGenreId && filteredBooks.length === 0) {
    return (
      <section className='section mt-10 py-20 text-center'>
        <h1 className='text-display-xs md:text-display-lg mb-6 font-bold'>
          {title}
        </h1>
        <div className='text-gray-500'>
          <p className='text-lg'>No books found in this genre yet.</p>
          <p className='mt-2 text-sm'>Try another category!</p>
        </div>
      </section>
    );
  }

  const booksToShow = selectedGenreId ? filteredBooks : allBooks;

  return (
    <section className='section mt-10'>
      <h1 className='text-display-xs md:text-display-lg mb-8 font-bold'>
        {title}
        {selectedGenreId && (
          <span className='ml-3 text-base font-normal text-neutral-600'>
            ({booksToShow.length})
          </span>
        )}
      </h1>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'>
        {booksToShow.map((book: any, index: number) => {
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
                    <span className='text-xs text-gray-400'>No Cover</span>
                  </div>
                )}
              </div>

              <div className='flex flex-col gap-1 p-4'>
                <h4 className='line-clamp-2 text-sm font-bold md:text-lg'>
                  {book.title}
                </h4>
                <p className='text-sm text-gray-600'>{book.author.name}</p>
                <div className='mt-2 flex items-center gap-1'>
                  <Star size={18} fill='#f59e0b' strokeWidth={0} />
                  <span className='text-sm font-semibold'>{avgRating}</span>
                </div>
              </div>
            </CustomCard>
          );
        })}
      </div>

      {/* Load More only when showing all books */}
      {!selectedGenreId && hasNextPage && (
        <div className='mt-12 flex justify-center'>
          <Button
            variant='outline'
            size='lg'
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More Books'}
          </Button>
        </div>
      )}
    </section>
  );
};

export default RecommendSection;
