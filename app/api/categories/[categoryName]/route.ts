import prisma from "@/lib/prismadb";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, {params}: {params: {categoryName: string} }) {
    
    const {categoryName} = params;

    try {

        const category = await prisma.category.findUnique({
            where: { categoryName },
            include: {posts: 
                { include: {author: true}, 
                orderBy: {createdAt: "desc"} 
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

export async function PATCH(request: NextRequest, {params}: {params: {categoryName: string} }) {
    
    const {categoryName} = params;
    const { updatedCategoryName } = await request.json();

    try {

        if(!categoryName || typeof categoryName !== 'string') {
            return NextResponse.json({error: "Invalid category"}, {status: 400}); 
        }

        const category = await prisma.category.findUnique({
            where: { categoryName }
        });

        if(!category) {
            return NextResponse.json({error: "Cateogry not found"}, {status: 404}); 
        }

        const updatedCategory = await prisma.category.update({
            where: { categoryName },
            data: { categoryName: updatedCategoryName }
        });

        if(!updatedCategory) {
            return NextResponse.json({error: "Unable to update category"}, {status: 400}); 
        }

        return NextResponse.json(updatedCategory, {status: 200});

    } catch (error) {
        return NextResponse.json({error: (error as any)?.message},{status: 500});
    }
}

export async function DELETE(request: NextRequest, {params}: {params: {categoryName: string} }) {
    
    const { categoryName } = params;
    
    try {

        if(!categoryName || typeof categoryName !== 'string') {
            return NextResponse.json({error: "Invalid post"}, {status: 400}); 
        }

        const categoryExist = await prisma.category.findUnique({
            where: {categoryName }
        });

        if(!categoryExist) {
            return NextResponse.json({error: "Category not found"}, {status: 404}); 
        }

        const userId = "";


        const deleteCategory = await prisma.category.delete({where:{id:categoryName}});

        if(!deleteCategory) {
            return NextResponse.json({error: "Unable to delete category"}, {status: 400}); 
        }

        return NextResponse.json({message: "Category deleted successfully"}, {status: 200});

    } catch (error) {
        return NextResponse.json({error: (error as any)?.message});
    }
}