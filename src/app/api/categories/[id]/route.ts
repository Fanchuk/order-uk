import { NextResponse } from 'next/server'
import prisma from '@/src/shared/lib/prisma'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params
        const categoryId = Number(resolvedParams.id)

        if (isNaN(categoryId)) {
            return NextResponse.json({ error: 'Invalid Category ID' }, { status: 400 })
        }

        const category = await prisma.category.findUnique({
            where: { id: categoryId },
            include: { subcategories: true },
        })

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 })
        }

        const products = await prisma.product.findMany({
            where: { categoryId: category.id },
        })

        return NextResponse.json({
            categoryName: category.name,
            subcategories: category.subcategories,
            products,
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Internal Server Error'
        console.error('Error fetching category products:', error)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
