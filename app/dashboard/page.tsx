import React from 'react'
import { postsData } from '@/data'
import Post from '../components/Post'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { PostProps } from '@/types/post';

export default async function Dashboard() {

    // const [posts, setPosts] = useState<PostProps[]>([]);

    // useEffect(() => {
    //   setPosts(postsData);
    // }, []);

        
    const session = await getServerSession(authOptions);
    if(!session) {
        return redirect('/sign-in');
    }

  return (
    <div>
        Dashboard
        <h1>Post</h1>

        { postsData && postsData?.length > 0 
          ?  postsData?.map((post) => <Post key={post?.id} post={post} />) 
          : <div className='py-6 flex flex-col items-center'>
            <span>No post created yet</span> 
            <Link href={"/post-create"} className='underline'>Create New Post</Link>
          </div>
        }
    </div>
  )
}
