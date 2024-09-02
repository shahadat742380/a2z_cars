import { relations, sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { uuid as uuidv4 } from "uuidv4";
import {  customerOrderStatus } from "./common";

// import table
import { customers } from "./tbl_customers";
import { orders } from "./tbl_orders";

export const customer_order_tracks = pgTable("customer_order_tracks", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  order_id: varchar("order_id")
    .notNull()
    .references(() => orders.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  customer_id: varchar("customer_id")
    .notNull()
    .references(() => customers.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  status: customerOrderStatus("status").default("ORDER_PLACED"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Customer = typeof customer_order_tracks.$inferSelect;
export type NewCustomer = typeof customer_order_tracks.$inferInsert;
