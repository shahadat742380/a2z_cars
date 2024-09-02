import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schemas/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:742380@localhost:5432/a2z-cars?schema=public",
  },
  verbose: true,
  strict: true,
  migrations: {
    table: "drizzle_migrations",
    schema: "public",
  },
  tablesFilter: ["public", "tembo"],
} satisfies Config;
