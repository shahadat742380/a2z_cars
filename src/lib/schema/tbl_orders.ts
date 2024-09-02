import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { uuid as uuidv4 } from "uuidv4";
import {  internalOrderStatus, OrderStatus, } from "./common";

// import tables
import { organizations } from "./tbl_organizations";
import { customers } from "./tbl_customers";
import { services } from "./tbl_services";
import { customers_vehicle } from "./tbl_customer_vehicles";

export const orders = pgTable("orders", {
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
  services_id: varchar("services_id")
    .notNull()
    .references(() => services.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  vehicle_id: varchar("vehicle_id")
    .notNull()
    .references(() => customers_vehicle.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  odometer_reading: integer("odometer_reading").notNull(),
  service_date_time: timestamp("created_at").notNull(),
status: OrderStatus("status").default("Requested"),
internal_order_status: internalOrderStatus("internal_order_status").default("REQUESTED"),
issue_description: text("issue_description").notNull(),
images: json("images").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Customer = typeof orders.$inferSelect;
export type NewCustomer = typeof orders.$inferInsert;
