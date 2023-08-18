import type { RequestEventCommon } from "@builder.io/qwik-city";
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";

import { binding } from "~/core/platform/bindings";

import * as schema from "./schema";

const DATABASE_BINDING = binding("DB");

export type DatabaseClient = DrizzleD1Database<typeof schema>;

export function createDatabaseClient({ platform }: RequestEventCommon): DatabaseClient {
  return drizzle(DATABASE_BINDING(platform), { schema });
}
