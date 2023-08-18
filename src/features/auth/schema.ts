import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: int("id").primaryKey(),
    emailAddress: text("email_address").unique().notNull(),
    emailVerifiedAt: int("email_verified_at", { mode: "timestamp_ms" }),
    createdAt: int("created_at", { mode: "timestamp_ms" })
        .notNull()
        .default(sql`current_timestamp`),
});
