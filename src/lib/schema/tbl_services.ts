import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar, point } from "drizzle-orm/pg-core";

// import table
import { organizations } from "./tbl_organizations";

export const services = pgTable("services", {
  id: varchar("id", { length: 256 }).primaryKey(),
  org_id: varchar("org_id")
    .notNull()
    .references(() => organizations.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  image: varchar("image"),
  service_name: varchar("service_name", { length: 256 }).notNull(),
  service_description: varchar("service_description").notNull(),
  price: point("price").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Org = typeof services.$inferSelect;
export type NewOrg = typeof services.$inferInsert;
