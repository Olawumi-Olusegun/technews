'use client';
import React, { useEffect, useState } from 'react'
import { postsData } from '@/data'
import Post from '../components/Post'
import Link from 'next/link'
import { PostProps } from '@/types/post';

export default function Dashboard() {

    const [posts, setPosts] = useState<PostProps[]>([]);

    useEffect(() => {
      setPosts(postsData);
    }, []);


  return (
    <div>
        Dashboard
        <h1>Post</h1>

        { posts && posts?.length > 0 
          ?  posts?.map((post) => <Post key={post?.id} post={post} />) 
          : <div className='py-6 flex flex-col items-center'>
            <span>No post created yet</span> 
            <Link href={"/post-create"} className='underline'>Create New Post</Link>
          </div>
        }
    </div>
  )
}
