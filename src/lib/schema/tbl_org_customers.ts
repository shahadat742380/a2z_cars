import { relations, sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { uuid as uuidv4 } from "uuidv4";
import { genderEnum } from "./common";

// import table
import { organizations } from "./tbl_organizations";

export const org_customers = pgTable("org_customers", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  customer_id: varchar("customer_id"),
  org_id: varchar("org_id")
    .notNull()
    .references(() => organizations.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  full_name: varchar("full_name", { length: 256 }),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Customer = typeof org_customers.$inferSelect;
export type NewCustomer = typeof org_customers.$inferInsert;
