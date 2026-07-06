import { defineConfig } from '@prisma/config'
import 'dotenv/config' // ← додай це (надійніше за @next/env для CLI)

export default defineConfig({
    datasource: {
        url: process.env.DATABASE_URL,
    },
    migrations: {
        seed: 'npx tsx prisma/seed.ts', // ← додай це
    },
})
