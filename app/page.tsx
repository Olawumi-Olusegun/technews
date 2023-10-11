'use client';
import { useEffect, useState } from "react";
import Categories from "./components/Categories";
import Post from "./components/Post";
import { postsData } from "@/data";
import { PostProps } from "@/types/post";

export default function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    setPosts(postsData);
  }, []);
  
  return (
    <>
      <div>
        <Categories />
        { posts && posts?.length > 0 
          ?  posts?.map((post) => <Post key={post?.id} post={post} />) 
          : <div className="py-6 text-center">No posts found</div> 
        }
      </div>
    </>
  )
}
