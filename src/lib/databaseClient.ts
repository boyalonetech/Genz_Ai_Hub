import { createClient } from "@supabase/supabase-js";

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL!;
const databaseAnonKey = process.env.NEXT_PUBLIC_DATABASE_ANON_KEY!;

if (!databaseUrl || !databaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const database = createClient(databaseUrl, databaseAnonKey);
