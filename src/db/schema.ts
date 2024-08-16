import {
  pgTable,
  uuid,
  text,
  timestamp,
  decimal,
  pgEnum,
  pgSchema,
} from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name"),
  fullName: text("full_name"),
  userName: text("user_name"),
  avatarUrl: text("avatar_url"),
  email: text("email").notNull().unique(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accountTypeEnum = pgEnum("account_type", [
  "current",
  "savings",
  "loan",
]);

export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => profiles.id)
    .notNull(),
  name: text("name").notNull(),
  type: accountTypeEnum("type").notNull(),
  balance: decimal("balance", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const envelopes = pgTable("envelopes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  budget: decimal("budget", { precision: 10, scale: 2 }).notNull(),
  userId: uuid("user_id")
    .references(() => profiles.id)
    .notNull(),
  accountId: uuid("account_id").references(() => accounts.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  envelopeId: uuid("envelope_id").references(() => envelopes.id),
  accountId: uuid("account_id")
    .references(() => accounts.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

