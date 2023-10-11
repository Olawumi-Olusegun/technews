
export interface PostProps {
    id: string;
    title: string;
    content: string;
    author: string;
    datepublished: string;
    category: string;
    links: string[];
    thumbnail?: string;
}

export interface SinglePostProps {
    post: PostProps
}