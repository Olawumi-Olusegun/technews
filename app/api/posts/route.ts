import prisma from '@/lib/prismadb';
import {NextRequest, NextResponse} from 'next/server'


export async function POST(request: NextRequest) {

    try {
        const body = await request.json();

        const { title, links, content, imageUrl, publicId, selectCategory } = body;

        if(!title || !content) {
            return NextResponse.json({error: "Title and content are required"}, {status: 400});
        }

        const authorEmail = "olawumi.olusegun@gmail.com";

        const createNewPost = await prisma.post.create({
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

        return NextResponse.json(createNewPost, {status: 201});

    } catch (error) {
        return NextResponse.json({error: (error as any)?.message});
    }
}

export async function GET(request: NextRequest) {
    try {

        const posts = await prisma.post.findMany({
            include: { author:  {select: { name: true }}},
            orderBy: {createdAt: 'desc'}
        });

        if(!posts) {
            return NextResponse.json({error: "No post found"}, {status: 404}); 
        }

        return NextResponse.json(posts, {status: 200});

    } catch (error) {
        return NextResponse.json({error: (error as any)?.message});
    }
}