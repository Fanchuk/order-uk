import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL!
    const pool = new Pool({
        connectionString,
        max: 3,
        idleTimeoutMillis: 60000, 
        connectionTimeoutMillis: 60000, 
        allowExitOnIdle: false,
    })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
}

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}

export default prisma
