import prisma from '@/lib/prismadb';
import {NextRequest, NextResponse} from 'next/server'


export async function GET(request: NextRequest, {params}: {params: {postId: string} }) {
    const { postId } = params;
    try {

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if(!post) {
            return NextResponse.json({error: "No post found"}, {status: 404}); 
        }

        return NextResponse.json(post, {status: 200});

    } catch (error) {
        return NextResponse.json({error: (error as any)?.message});
    }
}

export async function PATCH(request: NextRequest, {params}: {params: {postId: string} }) {
    const { postId } = params;
    try {

        const body = await request.json();

        const { title, links, content, imageUrl, publicId, selectCategory } = body;

        if(!title || !content) {
            return NextResponse.json({error: "Title and content are required"}, {status: 400});
        }

        const postExist = await prisma.post.findUnique({
            where: { id: postId }
        });

        if(!postExist) {
            return NextResponse.json({error: "Post not found"}, {status: 404}); 
        }

        const authorEmail = "olawumi.olusegun@gmail.com";

        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                title, 
                links, 
                content, 
                imageUrl, 
                publicId, 
                authorEmail,
                categoryName: selectCategory,
            }
        });

        if(!post) {
            return NextResponse.json({error: "Unable to update post"}, {status: 400}); 
        }

        return NextResponse.json(post, {status: 200});

    } catch (error) {
        return NextResponse.json({error: (error as any)?.message});
    }
}

export async function DELETE(request: NextRequest, {params}: {params: {postId: string} }) {
    
    const { postId } = params;
    
    try {

        if(!postId || typeof postId !== 'string') {
            return NextResponse.json({error: "Invalid post"}, {status: 400}); 
        }

        const postExist = await prisma.post.findUnique({
            where: { id: postId },
            include: {author: {select: {id: true}}}
        });

        if(!postExist) {
            return NextResponse.json({error: "Post not found"}, {status: 404}); 
        }

        const userId = "";

        if(postExist?.author?.id !== userId ) {
            return NextResponse.json({error: "You can only delete your post"}, {status: 400}); 
        }

        const deletedPost = await prisma.post.delete({where:{id:postId}});

        if(!deletedPost) {
            return NextResponse.json({error: "Unable to delete post"}, {status: 400}); 
        }

        return NextResponse.json({message: "Post deleted successfully"}, {status: 200});

    } catch (error) {
        return NextResponse.json({error: (error as any)?.message});
    }
}