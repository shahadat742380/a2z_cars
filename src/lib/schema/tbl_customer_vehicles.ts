import { relations, sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { uuid as uuidv4 } from "uuidv4";

// ** import tables
import { customers } from "./tbl_customers";
import { car_models } from "./tbl_car_models";

export const customers_vehicle = pgTable("customers_vehicle", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  customer_id: varchar("customer_id")
    .notNull()
    .references(() => customers.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  model_id: integer("model_id")
    .notNull()
    .references(() => car_models.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  fuel_type: varchar("fuel_type"),
  email: text("email").notNull(),
  color: text("color").notNull(),
  number_plate: text("number_plate").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Customer = typeof customers_vehicle.$inferSelect;
export type NewCustomer = typeof customers_vehicle.$inferInsert;

// ** __________ Customer Notifications RELATIONS __________ ** //

export const customersRelations = relations(customers_vehicle, ({ one }) => ({
  orgs: one(customers, {
    fields: [customers_vehicle.customer_id],
    references: [customers.id],
  }),
}));
