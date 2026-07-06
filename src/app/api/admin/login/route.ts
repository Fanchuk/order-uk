import { error } from "console";
import { NextResponse } from "next/server";
import { z } from 'zod'

const bodyShema = z.object({ password: z.string().min(1) })

export async function POST(request: Request) {
    try {
        const parsed = bodyShema.safeParse(await request.json())
        if (!parsed.success) {
            return NextResponse.json({ error: 'Password required' }, { status: 400 })
        }

        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

        if (parsed.data.password !== adminPassword) {
            return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
        }

        const res = NextResponse.json({ ok: true })
        res.cookies.set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 8
        })
        return res
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function DELETE() {
    const res = NextResponse.json({ ok: true })
    res.cookies.delete('admin_session')
    return res
}