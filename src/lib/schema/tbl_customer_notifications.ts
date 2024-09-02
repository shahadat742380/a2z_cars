import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { uuid as uuidv4 } from "uuidv4";
import { notificationStatusEnum } from "./common";

// import table
import { customers } from "./tbl_customers";

export const customer_notifications = pgTable("customer_notifications", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  customer_id: varchar("customer_id")
    .notNull()
    .references(() => customers.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  message: varchar("message").notNull(),
  type: varchar("type").notNull(),
  // need to added enum value
  status: notificationStatusEnum("status").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Customer = typeof customer_notifications.$inferSelect;
export type NewCustomer = typeof customer_notifications.$inferInsert;

// ** __________ Customer Notifications RELATIONS __________ ** //

export const customersRelations = relations(
  customer_notifications,
  ({ one }) => ({
    orgs: one(customers, {
      fields: [customer_notifications.customer_id],
      references: [customers.id],
    }),
  })
);
