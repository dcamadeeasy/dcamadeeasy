import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int("id").primaryKey(),
  email: text("email").unique().notNull(),
  verifiedAt: int("verified_at", { mode: "timestamp_ms" }),
});

export const verificationTokens = sqliteTable(
  "verification_tokens",
  {
    id: int("id").primaryKey(),
    token: text("token").notNull(),
    email: text("email").notNull(),
    expiredAt: int("verified_at", { mode: "timestamp_ms" }).notNull(),
  },
  ({ token, email }) => ({
    tokenEmailUnique: uniqueIndex("verification_tokens_token_email_unique").on(token, email),
  }),
);
