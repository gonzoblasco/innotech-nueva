import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

config({ path: '.env.local' })

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.SUPABASE_DB_HOST!,
    port: 5432,
    user: 'postgres',
    password: process.env.SUPABASE_DB_PASSWORD!,
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
  },
  verbose: true,
})
