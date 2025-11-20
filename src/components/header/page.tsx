'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

type UserName = {
  name: string;
};

const HeaderSection = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserName | null>(null);
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser(JSON.parse(localStorage.getItem('user') || ''));
      setToken(localStorage.getItem('token'));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <>
      <header className='fixed top-0 left-1/2 z-50 flex h-16 w-[393px] -translate-x-1/2 items-center justify-between gap-4 bg-white px-4 shadow-[0_0_20px_0_rgba(203,202,202,0.25)] md:h-20 md:w-[1440px] md:px-30'>
        {/* LOGO */}
        <Link href='/'>
          <div className='flex gap-[15px]'>
            <Image
              src='/images/logo.svg'
              width={40}
              height={40}
              alt='logo'
              className='h-[40px] w-[40px] md:h-[42px] md:w-[42px]'
            />
            <h3 className='text-display-md hidden leading-[42px] font-bold md:block'>
              Booky
            </h3>
          </div>
        </Link>

        {/* Not login  */}
        {!token ? (
          // PC
          <>
            <div className='hidden gap-4 md:flex'>
              <Link href='/login' className='h-12 w-[163px]'>
                <Button variant={'outline'} className='h-12 w-[163px]'>
                  Login
                </Button>
              </Link>
              <Link href='/register' className='h-12 w-[163px]'>
                <Button className='h-12 w-[163px]'>Register</Button>
              </Link>
            </div>

            <Sheet>
              <SheetTrigger className='md:hidden'>
                <Menu size={24} />
              </SheetTrigger>
              <SheetContent className='flex flex-col gap-4 px-10 py-20'>
                <Link href='/login' className='h-12 w-full'>
                  <Button variant={'outline'} className='h-12 w-full'>
                    Login
                  </Button>
                </Link>
                <Link href='/register' className='h-12 w-full'>
                  <Button className='h-12 w-full'>Register</Button>
                </Link>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <>
            <div className='relative hidden md:flex'>
              <Input
                type='text'
                placeholder='Search book'
                className='hidden w-[500px] rounded-full indent-7 md:block'
              />
              <Search
                size={20}
                color='#535862'
                className='absolute top-1/2 left-3 -translate-y-1/2'
              />
            </div>

            <div
              className={`flex items-center justify-between ${showSearchMobile ? 'gap-2' : 'gap-4'}`}
            >
              <motion.div
                className='relative md:hidden'
                initial={{ opacity: 0, scaleX: 0, width: 0 }}
                animate={{
                  opacity: showSearchMobile ? 1 : 0,
                  scaleX: showSearchMobile ? 1 : 0,
                  width: showSearchMobile ? 265 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                style={{ transformOrigin: 'right' }}
              >
                <Input
                  type='text'
                  placeholder='Search book'
                  className={`w-full rounded-full indent-7 md:hidden ${showSearchMobile ? 'block' : 'hidden'}`}
                />
                <Search
                  size={20}
                  color='#535862'
                  className='absolute top-1/2 left-3 -translate-y-1/2 md:hidden'
                />
              </motion.div>
              <Search
                size={24}
                className={`cursor-pointer md:hidden ${showSearchMobile ? 'hidden' : 'block'}`}
                onClick={() => {
                  setShowSearchMobile(!showSearchMobile);
                }}
              />
              <X
                size={24}
                className={`cursor-pointer md:hidden ${!showSearchMobile ? 'hidden' : 'block'}`}
                onClick={() => {
                  setShowSearchMobile(!showSearchMobile);
                }}
              />
              <Image
                src='/images/Bag.svg'
                width={32}
                height={32}
                alt='bag'
                className={`size-7 md:block md:size-8 ${showSearchMobile ? 'hidden' : 'block'}`}
              />
              <DropdownMenu>
                <div className='flex items-center gap-4'>
                  <Link href='/profile' className='flex items-center gap-4'>
                    <Image
                      src='/images/profile.svg'
                      width={48}
                      height={48}
                      alt='profile'
                      className={`size-10 rounded-full md:block md:size-12 ${showSearchMobile ? 'hidden' : 'block'}`}
                    />
                    <p className='hidden text-lg leading-[32px] font-semibold tracking-tight md:block'>
                      {user?.name}
                    </p>
                  </Link>
                  <DropdownMenuTrigger>
                    <ChevronDown size={24} className='hidden md:block' />
                  </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Button
                      onClick={handleLogout}
                      className='w-fit bg-red-500 px-5'
                    >
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default HeaderSection;
