'use client';

import CustomCard from '@/components/customCard/card';
import { getAllGenres } from '@/services/book.service';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useGenreStore } from '@/hook/genreStore';
import { cn } from '@/lib/utils';

const GenreSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: getAllGenres,
  });

  const { setGenre, selectedGenreId } = useGenreStore();

  const genres = data?.data.categories || [];

  return (
    <section className='section mt-10'>
      <div className='grid grid-cols-3 gap-4 md:grid-cols-6'>
        {/* All Books Button */}
        <CustomCard
          variant='genre'
          onClick={() => setGenre(null)}
          className={cn(
            'border-2 transition-all',
            !selectedGenreId
              ? 'border-blue-500 bg-blue-50'
              : 'border-transparent'
          )}
        >
          <div className='flex h-12 w-full items-center justify-center rounded-xl bg-[#1C65DA]'>
            <span className='text-lg font-bold text-white'>All</span>
          </div>
          <p className='text-center font-semibold text-blue-700'>All Books</p>
        </CustomCard>

        {genres.map((genre: any, i: number) => (
          <CustomCard
            key={genre.id}
            variant='genre'
            animateIndex={i + 1}
            onClick={() => setGenre(genre.id, genre.name)}
            className={cn(
              'transition-all',
              selectedGenreId === genre.id &&
                'ring-2 ring-blue-500 ring-offset-2'
            )}
          >
            <div className='flex h-12 w-full items-center justify-center rounded-xl bg-[#E0ECFF]'>
              <Image
                src='/images/iconCategory.svg'
                width={48}
                height={48}
                alt={genre.name}
                className='size-10 md:size-12'
              />
            </div>
            <p className='text-center text-xs font-semibold md:text-sm'>
              {genre.name}
            </p>
          </CustomCard>
        ))}
      </div>
    </section>
  );
};

export default GenreSection;
