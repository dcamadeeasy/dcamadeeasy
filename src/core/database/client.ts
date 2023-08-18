import type { RequestEventCommon } from "@builder.io/qwik-city";
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";

import { binding } from "~/core/platform/bindings";

import * as schema from "./schema";

const DATABASE_BINDING = binding("DB");
const SHARED_DATABASE_KEY = "database";

export type DatabaseClient = DrizzleD1Database<typeof schema>;

export function getDatabase(event: RequestEventCommon) {
  return getSharedDatabase(event) ?? createDatabase(event);
}

export function createDatabase(event: RequestEventCommon) {
  const database = createDatabaseClient(event);
  setSharedDatabase(event, database);
  return database;
}

function createDatabaseClient({ platform }: RequestEventCommon): DatabaseClient {
  return drizzle(DATABASE_BINDING(platform), { schema });
}

function getSharedDatabase({ sharedMap }: RequestEventCommon) {
  return sharedMap.get(SHARED_DATABASE_KEY) as DatabaseClient | undefined;
}

function setSharedDatabase({ sharedMap }: RequestEventCommon, database: DatabaseClient) {
  sharedMap.set(SHARED_DATABASE_KEY, database);
}
