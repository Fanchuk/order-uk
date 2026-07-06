import { NextResponse } from 'next/server'
import prisma from '@/src/shared/lib/prisma'

const TEMP_USER_ID = 'user-customer-1'

export async function GET() {
    try {
        const addresses = await prisma.address.findMany({
            where: { userId: TEMP_USER_ID },
            orderBy: { isDefault: 'desc' },
        })

        return NextResponse.json(
            addresses.map((a) => ({
                id: a.id,
                label: a.label,
                line1: a.line1,
                postcode: a.postcode,
                isDefault: a.isDefault,
            })),
        )
    } catch (error) {
        console.error('Addresses API Error:', error)
        return NextResponse.json([], { status: 200 })
    }
}
