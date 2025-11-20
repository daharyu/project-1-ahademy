'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getBookBorrow } from '@/services/book.service';
import { useQuery } from '@tanstack/react-query';
import { Dot, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

type Loan = {
  id: number;
  status: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  book: {
    id: number;
    title: string;
    coverImage: string;
    author?: string;
    category?: string;
  };
};

const BorrowedPage = () => {
  const [status, setStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: response, isLoading } = useQuery({
    queryKey: ['borrowed'],
    queryFn: getBookBorrow,
  });

  const loans: Loan[] = response?.data?.loans || [];

  const filteredLoans = useMemo(() => {
    let filtered = loans;

    if (status === 'active') {
      filtered = filtered.filter(
        (loan) => loan.status === 'BORROWED' && !loan.returnedAt
      );
    } else if (status === 'return') {
      filtered = filtered.filter((loan) => loan.returnedAt);
    } else if (status === 'overdue') {
      const now = new Date();
      filtered = filtered.filter(
        (loan) =>
          loan.status === 'BORROWED' &&
          !loan.returnedAt &&
          new Date(loan.dueAt) < now
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((loan) =>
        loan.book.title.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [loans, status, searchQuery]);

  if (isLoading) return null;

  return (
    <motion.div
      className='flex flex-col gap-6'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className='md:text-display-sm text-display-xs leading-9 font-bold md:leading-[38px] md:tracking-tighter'>
        Borrowed List
      </h3>

      {/* Search */}
      <div className='relative w-full md:w-[557px]'>
        <Input
          type='text'
          placeholder='Search book'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full rounded-full indent-7 md:block'
        />
        <Search
          size={20}
          color='#535862'
          className='absolute top-1/2 left-3 -translate-y-1/2'
        />
      </div>

      {/* Filter Tabs */}
      <div className='flex gap-2 md:gap-3'>
        {['all', 'active', 'return', 'overdue'].map((filter) => (
          <div
            key={filter}
            className={`flex h-10 cursor-pointer items-center justify-center rounded-full border px-4 py-2 ${
              status === filter
                ? 'border-[#1C65DA] bg-[#F6F9FE]'
                : 'border-neutral-300 bg-white'
            }`}
            onClick={() => setStatus(filter)}
          >
            <p
              className={`text-md leading-[30px] font-bold capitalize ${
                status === filter ? 'text-[#1C65DA]' : 'text-neutral-950'
              }`}
            >
              {filter === 'return' ? 'Returned' : filter}
            </p>
          </div>
        ))}
      </div>

      {/* List */}
      <div className='flex w-full flex-col p-4'>
        {filteredLoans.length === 0 ? (
          <p className='py-10 text-center text-gray-500'>
            {searchQuery || status !== 'all'
              ? 'No books match your filter'
              : 'You have no borrowed books'}
          </p>
        ) : (
          <div className='flex w-full flex-col gap-4'>
            {filteredLoans.map((loan) => {
              const isReturned = !!loan.returnedAt;
              const isOverdue =
                loan.status === 'BORROWED' &&
                !loan.returnedAt &&
                new Date(loan.dueAt) < new Date();

              return (
                <motion.div
                  key={loan.id}
                  className='flex w-full flex-col gap-4 rounded-2xl p-4 shadow-lg shadow-[#CBCACA40] md:gap-5 md:p-5'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Status + Due Date */}
                  <div className='flex justify-between'>
                    <div className='md:text-md flex gap-1 text-sm leading-7 font-bold tracking-tight md:gap-3 md:leading-[30px]'>
                      <p className='my-auto'>Status</p>
                      <span
                        className={`flex h-8 items-center justify-center rounded-[4px] px-2 py-0.5 text-sm font-bold ${
                          isReturned
                            ? 'bg-[#E6F4EA] text-[#24A500]' // Green for Returned
                            : isOverdue
                              ? 'bg-[#FEF2F2] text-[#EE1D52]' // Red for Overdue
                              : 'bg-[#24A5000D] text-[#24A500]' // Light green for Active
                        }`}
                      >
                        {isReturned
                          ? 'Returned'
                          : isOverdue
                            ? 'Overdue'
                            : 'Active'}
                      </span>
                    </div>

                    <div className='md:text-md flex gap-1 text-sm leading-7 font-bold tracking-tight md:gap-3 md:leading-[30px]'>
                      <p className='my-auto'>Due Date</p>
                      <span
                        className={`flex h-8 items-center justify-center rounded-[4px] bg-[#FEF2F2] px-2 py-0.5 text-sm font-bold text-[#EE1D52]`}
                      >
                        {new Date(loan.dueAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <hr className='border-[#D5D7DA]' />

                  {/* Book Info + TWO Buttons */}
                  <div className='flex flex-col justify-between gap-6 md:flex-row'>
                    <div className='flex gap-4'>
                      {loan.book.coverImage ? (
                        <Image
                          src={loan.book.coverImage}
                          width={92}
                          height={138}
                          alt={loan.book.title}
                          className='rounded object-cover'
                        />
                      ) : (
                        <div className='flex h-[138px] w-[92px] items-center justify-center rounded bg-gray-200'>
                          <span className='text-xs text-gray-400'>
                            No Cover
                          </span>
                        </div>
                      )}

                      <div className='flex flex-col gap-1'>
                        <p className='flex w-fit items-center justify-center rounded-sm border border-neutral-300 px-2 text-xs'>
                          {loan.book.category || 'Uncategorized'}
                        </p>
                        <h6 className='text-md leading-[30px] font-bold tracking-tight md:text-xl md:leading-[34px]'>
                          {loan.book.title}
                        </h6>
                        <span className='md:text-md text-sm leading-7 font-medium tracking-tighter md:leading-[30px]'>
                          {loan.book.author || 'Unknown Author'}
                        </span>
                        <div className='md:text-md flex items-center gap-1 text-sm leading-7 font-bold tracking-tight md:gap-2 md:leading-[30px]'>
                          <p>
                            {new Date(loan.borrowedAt).toLocaleDateString(
                              'en-GB',
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                          </p>
                          <Dot size={20} />
                          <p>Duration 3 Days</p>
                        </div>
                      </div>
                    </div>

                    {/* TWO BUTTONS */}
                    <div className='flex flex-col gap-3 md:flex-row md:items-center'>
                      {/* Return Book Button */}
                      <Button
                        className={`h-10 w-full md:w-[182px] ${isReturned ? 'hidden' : ''}`}
                        onClick={() => alert(`Returning: "${loan.book.title}"`)}
                      >
                        Return Book
                      </Button>

                      {/* Give Review Button - ALWAYS visible & enabled */}
                      <Button
                        className='h-10 w-full md:w-[182px]'
                        variant='default'
                      >
                        Give Review
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BorrowedPage;
