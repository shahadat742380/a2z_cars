import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const organizations = pgTable("organizations", {
  id: varchar("id", { length: 256 }).primaryKey(),
  slug: varchar("slug", { length: 256 }).unique(),
  org_name: varchar("org_name", { length: 256 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Org = typeof organizations.$inferSelect;
export type NewOrg = typeof organizations.$inferInsert;
