import React from 'react'
import { categoriesData } from '@/data'
import Link from 'next/link'

export default function Categories() {

    

  return (
    <div className='flex gap-2 text-sm flex-wrap my-4'>
        { categoriesData ?  
          categoriesData?.map((category) => (
            <Link
                href={`/categories/${category?.id}`}
                key={category?.id}
                className='px-3 py-1 rounded-md bg-slate-800 text-white'
                >
                    {category?.name}
            </Link>
          ) )
        : null}
    </div>
  )
}
