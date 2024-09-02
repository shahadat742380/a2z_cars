import { sql } from "drizzle-orm";
import { serial, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const car_models = pgTable("car_models", {
  id: serial("id").notNull(),
  image: varchar("image").notNull(),
  car_type: varchar("car_type").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Customer = typeof car_models.$inferSelect;
export type NewCustomer = typeof car_models.$inferInsert;

