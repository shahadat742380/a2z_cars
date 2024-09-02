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

export const customers = pgTable("customers", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  org_id: varchar("org_id")
    .notNull()
    .references(() => organizations.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  full_name: varchar("full_name", { length: 256 }),
  email: text("email").unique().notNull(),
  dob: timestamp("dob").notNull(),
  gender: genderEnum("gender").notNull(),
  phone: text("phone").notNull(),
  email_reminder_on: boolean("email_reminder_on").default(false),
  app_notification_on: boolean("app_notification_on").default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

// ** __________ Customers RELATIONS __________ ** //

export const customersRelations = relations(customers, ({ one }) => ({
  orgs: one(organizations, {
    fields: [customers.org_id],
    references: [organizations.id],
  }),
}))
