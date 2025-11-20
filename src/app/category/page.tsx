'use client';
import CustomCard from '@/components/customCard/card';
import FooterPage from '@/components/footer/page';
import HeaderSection from '@/components/header/page';
import { Checkbox } from '@/components/ui/checkbox';
import { getAllBooks, getAllGenresCategory } from '@/services/book.service';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

const CategoryPage = () => {
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Data fetching (unchanged)
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['books'],
      queryFn: ({ pageParam = 1 }) => getAllBooks(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.data.pagination || {};
        return page < totalPages ? page + 1 : undefined;
      },
    });

  const { data: dataCategory, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['categoryGenre'],
    queryFn: getAllGenresCategory,
  });

  if (isLoading) return null;
  if (isLoadingCategory) return null;

  const categories = dataCategory?.data.categories;

  const allBooks = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.books) ?? [];
  }, [data]);

  // FILTER LOGIC — only this part is new
  const filteredBooks = useMemo(() => {
    if (selectedCategories.length === 0 && selectedRatings.length === 0) {
      return allBooks;
    }

    return allBooks.filter((book: any) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(String(book.categoryId));

      const avgRating =
        book.reviewCount > 0 ? Math.floor(book.rating / book.reviewCount) : 0;

      const ratingMatch =
        selectedRatings.length === 0 || selectedRatings.includes(avgRating);

      return categoryMatch && ratingMatch;
    });
  }, [allBooks, selectedCategories, selectedRatings]);

  // Toggle functions
  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((x) => x !== rating)
        : [...prev, rating]
    );
  };

  return (
    <>
      <HeaderSection />
      <section className='section mt-20 md:mt-[128px]'>
        <h1 className='text-display-xs md:text-display-lg mb-6 font-bold'>
          Book List
        </h1>

        {/* Container */}
        <div className='w-full flex-col items-center gap-5 md:flex md:flex-row md:gap-10'>
          {/* Left Aside */}
          <aside className='hidden flex-col py-4 shadow-lg shadow-[#CBCACA40] md:flex md:w-[266px] md:gap-6'>
            {/* Filter */}
            <div className='flex flex-col gap-2.5 px-4'>
              <h6 className='text-md leading-[30px] font-bold'>Filter</h6>
              <h5 className='text-lg leading-8 font-bold tracking-tight'>
                                Category               
              </h5>
              {categories?.map((category: any) => (
                <div className='flex gap-2' key={category.id}>
                  <Checkbox
                    checked={selectedCategories.includes(String(category.id))}
                    onCheckedChange={() => toggleCategory(String(category.id))}
                    className='my-auto'
                  />
                  <p className='text-md my-auto leading-[30px] font-medium tracking-tighter'>
                    {category.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Horizontal Line */}
            <hr className='border-neutral-300' />

            {/* Rating — YOUR ORIGINAL DESIGN 100% */}
            <div className='flex flex-col gap-2.5 px-4'>
              <h6 className='text-md leading-[30px] font-bold'>Rating</h6>
              {[5, 4, 3, 2, 1]?.map((rate: any) => (
                <div className='flex gap-2' key={rate}>
                  <Checkbox
                    checked={selectedRatings.includes(rate)}
                    onCheckedChange={() => toggleRating(rate)}
                    className='my-auto'
                  />
                  <Star
                    size={24}
                    fill='orange'
                    stroke='transparent'
                    className='my-auto'
                  />
                  <p className='text-md leading-[30px] font-medium tracking-tighter'>
                    {rate}
                  </p>
                </div>
              ))}
            </div>
          </aside>

          {/* Right */}
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'>
            {filteredBooks.length === 0 ? (
              <p className='col-span-full py-20 text-center text-lg text-gray-500'>
                No books match your filters.
              </p>
            ) : (
              filteredBooks.map((book: any, index: number) => {
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
                        {book.author.name}
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
              })
            )}
          </div>
        </div>
      </section>
      <FooterPage />
    </>
  );
};

export default CategoryPage;
