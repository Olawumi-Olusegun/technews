import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='flex items-center justify-between pb-4 border-b '>
        <div >
            <Link href='/'>
                <h1 className='text-4xl text-dark font-bold tracking-tighter'>Tech News</h1>
            </Link>
            <p className='text-sm'>Exploring Tomorrow's Innovation, <br/> One Byte at a time </p>
        </div>
        <div className='flex items-center '>
            <Link className='btn' href="/sign-in">Sign In</Link>
        </div>
    </div>
  )
}
