import type { Config } from "drizzle-kit";

export default {
  schema: "src/core/database/schema.ts",
  out: "migrations",
  driver: "better-sqlite",
  tablesFilter: ["!d1_migrations"],
  dbCredentials: {
    url: ".wrangler/state/v3/d1/2eb28562-7857-4df2-b6cd-be753f90735b/db.sqlite",
  },
} satisfies Config;
