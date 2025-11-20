import React, { use, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { DialogClose, DialogHeader } from '@/components/ui/dialog';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
};

const MePage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const route = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser(JSON.parse(localStorage.getItem('user') || ''));
      setToken(localStorage.getItem('token'));
    } else {
      route.push('/');
    }
  }, [token]);
  return (
    <>
      <motion.div
        className='flex flex-col gap-6 md:w-[557px]'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
        }}
      >
        <h3 className='md:text-display-sm text-display-xs leading-9 font-bold md:leading-[38px] md:tracking-tighter'>
          Profile
        </h3>

        <div className='flex w-full flex-col gap-5 rounded-2xl p-4 shadow-lg shadow-[#CBCACA40] md:gap-6 md:p-5'>
          {/* Detail me */}
          <div className='flex flex-col gap-2 md:gap-3'>
            <Image
              src='/images/profile.svg'
              width={64}
              height={64}
              alt='me'
              className='rounded-full'
            />
            {/* Name */}
            <div className='flex flex-row justify-between'>
              <p className='md:text-md text-sm leading-7 font-medium tracking-tighter md:leading-[30px]'>
                Name
              </p>
              <span className='md:text-md text-sm leading-7 font-bold tracking-tight md:leading-[30px]'>
                {user?.name}
              </span>
            </div>

            {/* Email */}
            <div className='flex flex-row justify-between'>
              <p className='md:text-md text-sm leading-7 font-medium tracking-tighter md:leading-[30px]'>
                Email
              </p>
              <span className='md:text-md text-sm leading-7 font-bold tracking-tight md:leading-[30px]'>
                {user?.email}
              </span>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className='w-full'>Update Profile</Button>
            </DialogTrigger>
            <DialogContent className='fixed top-0 left-0 z-60 h-screen w-screen bg-black/10'>
              <div className='fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-md bg-white p-10'>
                <Label className=''>Name</Label>
                <Input
                  type='text'
                  placeholder='Name'
                  defaultValue={user?.name}
                />
                <DialogClose asChild>
                  <Button className='w-full p-4'>Confirm</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
    </>
  );
};

export default MePage;
