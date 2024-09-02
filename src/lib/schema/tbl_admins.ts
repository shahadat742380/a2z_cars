import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

// import table
import { organizations } from "./tbl_organizations";

export const admins = pgTable("admins", {
  id: varchar("id", { length: 256 }).primaryKey(),
  org_id: varchar("org_id")
    .notNull()
    .references(() => organizations.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  first_name: varchar("first_name", { length: 256 }).notNull(),
  last_name: varchar("last_name", { length: 256 }),
  email: varchar("email").unique().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Org = typeof admins.$inferSelect;
export type NewOrg = typeof admins.$inferInsert;
