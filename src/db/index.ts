import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: [".env", ".env.local"] });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is missing!");

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
