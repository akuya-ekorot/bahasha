import { config } from "dotenv";
import type { Config } from "drizzle-kit";

config({ path: [".env", ".env.local"] });

export default {
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./supabase/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
