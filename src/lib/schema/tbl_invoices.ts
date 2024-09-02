import { relations, sql } from "drizzle-orm";
import { pgTable, point, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { uuid as uuidv4 } from "uuidv4";

// import table
import { organizations } from "./tbl_organizations";
import { orders } from "./tbl_orders";
import { customers } from "./tbl_customers";

export const invoices = pgTable("invoices", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  org_id: varchar("org_id")
    .notNull()
    .references(() => organizations.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  customer_id: varchar("customer_id")
    .notNull()
    .references(() => customers.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  order_id: varchar("order_id")
    .notNull()
    .references(() => orders.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  currency: varchar("currency").default("INR"),
  amount: point("amount").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Customer = typeof invoices.$inferSelect;
export type NewCustomer = typeof invoices.$inferInsert;
