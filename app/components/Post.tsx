import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import DeleteBtn from './DeleteBtn';
import { SinglePostProps } from '@/types/post';

export default function Post({post}: SinglePostProps) {

    const isEditable = true;

  return (
    <div className='my-4 border-b border-b-gray-300 py-8'>
        <div className='mb-4'>
            Posted by: <span className='font-bold'>
                {post?.author} on {new Date(post?.datepublished).toDateString()}
            </span>
        </div>
        <div className='w-full h-72 relative'>
            {
                post?.thumbnail 
                ? <Image src={post?.thumbnail} alt={post?.title} fill className='object-cover rounded-md object-center' /> 
                : <Image src={"/thumbnail-placeholder.png"} alt={post?.title} fill className='object-cover rounded-md object-center' />
            }
        </div>
        {
            post?.category && <Link 
                    href={`/categories/${post?.category}`}
                    className='bg-slate-800 w-fit text-white my-3 block px-4 py-0.5 text-sm font-bold rounded-md'
                    >
                    {post?.category}
                </Link>
        }
        <h2>{post?.title}</h2>
        <p className='content'>{post?.content}</p>
        
        {
            post?.links && <div className='my-4 flex-col gap-3'>
                <div className='flex space-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>

                    {post?.links?.map((link, index) => (
                        <div key={index}> <Link href={link}>{link}</Link> </div>
                    ) )}
                </div>
            </div>
        }

        {
            isEditable && (
                <div className='flex gap-3 font-bold py-2 px-4 rounded-md w-fit'>
                    <Link href={`/edit-post/${post?.id} `} className='bg-blue-600 hover:bg-blue-500 transition text-white py-1 px-2 rounded-md'>Edit</Link>
                    <DeleteBtn />
                </div>
            )
        }

    </div>
  )
}
