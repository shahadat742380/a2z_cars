import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";



const client = new Client({
  connectionString: "postgresql://postgres:742380@localhost:5432/a2z-cars?schema=public",
});

const db = drizzle(client);