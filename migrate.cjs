require('dotenv').config({ path: '.env' });
const { Client } = require('pg');

async function runMigration() {
    // Strip out sslmode=require from the string to prevent pg-connection-string from strictly applying it
    const url = process.env.POSTGRES_URL_NON_POOLING.replace('?sslmode=require', '');

    const client = new Client({
        connectionString: url,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();

        // Create the profiles table
        console.log("Creating profiles table...");
        await client.query(`
      CREATE TABLE IF NOT EXISTS public.profiles (
        id uuid references auth.users not null primary key,
        email text,
        name text,
        resumes_left integer default 20,
        skill_score integer default 0,
        profile_data jsonb
      );
    `);

        // Enable Row Level Security (RLS)
        console.log("Enabling Row Level Security...");
        await client.query(`ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;`);

        // Create Policies (Ignore errors if they already exist)
        console.log("Applying policies...");
        try {
            await client.query(`CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);`);
        } catch (e) {
            if (e.code !== '42710') throw e; // 42710 = duplicate_object
        }

        try {
            await client.query(`CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);`);
        } catch (e) {
            if (e.code !== '42710') throw e;
        }

        try {
            await client.query(`CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);`);
        } catch (e) {
            if (e.code !== '42710') throw e;
        }

        console.log("Migration completed successfully.");
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await client.end();
    }
}

runMigration();
