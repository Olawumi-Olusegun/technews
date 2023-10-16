import prisma from "@/lib/prismadb";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, {params}: {params: {email: string} }) {
    
    const {email} = params;

    try {

        const category = await prisma.user.findUnique({
            where: { email },
            include: {posts: { orderBy: {createdAt: "desc"} 
            } },
        });

        if(!category) {
            return NextResponse.json({error: "Cateogry not found"}, {status: 404}); 
        }

        return NextResponse.json(category, {status: 200});
    } catch (error) {
        return NextResponse.json({error: (error as any)?.message},{status: 500});
    }
}