'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {

  const {data: session, status } = useSession();

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(popupRef.current && !popupRef.current?.contains(event.target as Node)) {
        setIsPopupVisible(false)
      }
    }
    document.addEventListener("click", handleClickOutside);
    if(!isPopupVisible) {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isPopupVisible])

  return (
    <div className='flex items-center justify-between pb-4 mb-4 border-b relative'>
        <div >
            <Link href='/' className='hover:translate-x-6 transition'>
                <h1 className='text-4xl text-dark font-bold tracking-tighter'>Tech News</h1>
            </Link>
            <p className='text-sm'>Exploring Tomorrows Innovation, <br/> One Byte at a time </p>
        </div>
        {
          status === 'authenticated' ? (
            <>
            <div className='flex gap-2 items-center'>
            <Link href="/create-post" className='hidden md:flex gap-2 items-center mr-6'>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span>Create Post</span>
            </Link>
            
            <Image 
                src={session?.user?.image!} 
                width={36} 
                height={36} 
                alt='user-profile-image'
                className='rounded-full cursor-pointer'
                onClick={() => setIsPopupVisible(!isPopupVisible)}
              />
            </div>


            <div ref={popupRef} className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex flex-col gap-2 text-right min-w-[160px] transition ${isPopupVisible ? "flex transition" : "hidden"} `}>
              <div className='flex flex-col space-y-2'>
                <div className='font-bold'>{session?.user?.name}</div>
                <div>{session?.user?.email}</div>
                <Link className='hover:underline' href="/dashboard" onClick={() => setIsPopupVisible(!isPopupVisible)}>Dashboard</Link>
                <Link className='hover:underline' href="/create-post" onClick={() => setIsPopupVisible(!isPopupVisible)}>Create Post</Link>
                <button type='button'
                  onClick={() => {
                    signOut();
                    setIsPopupVisible(!isPopupVisible);
                  }}
                  className='btn w-full mt-2'
                  >
                  Sign out
                </button>
              </div>
            </div>
            
            </>
          ) : (
          <div className='flex items-center '>
              <Link className='btn' href="/sign-in">Sign In</Link>
          </div>
          )
        }
    </div>
  )
}
