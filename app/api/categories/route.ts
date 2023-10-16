import prisma from "@/lib/prismadb";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories, {status: 200});
    } catch (error) {
        return NextResponse.json({error: (error as any)?.message},{status: 500});
    }
}