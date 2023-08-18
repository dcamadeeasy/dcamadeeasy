import type { RequestEventCommon } from "@builder.io/qwik-city";

import { createDatabaseClient, type DatabaseClient } from "./client";

const SHARED_DATABASE_KEY = "database";

export function withDatabase() {
  return {
    onRequest: (event: RequestEventCommon) => {
      createDatabase(event);
    },
  };
}

export function getDatabase(event: RequestEventCommon) {
  return getSharedDatabase(event) ?? createDatabase(event);
}

function createDatabase(event: RequestEventCommon) {
  const database = createDatabaseClient(event);
  setSharedDatabase(event, database);
  return database;
}

function getSharedDatabase({ sharedMap }: RequestEventCommon) {
  return sharedMap.get(SHARED_DATABASE_KEY) as DatabaseClient | undefined;
}

function setSharedDatabase({ sharedMap }: RequestEventCommon, database: DatabaseClient) {
  sharedMap.set(SHARED_DATABASE_KEY, database);
}
