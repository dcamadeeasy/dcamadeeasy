import type { RequestEvent } from "@builder.io/qwik-city";

import { createDatabase } from "~/core/database";

export function onRequest(event: RequestEvent) {
  createDatabase(event);
}
